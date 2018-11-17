import { hashSync } from "bcrypt-nodejs";
import User from "./../../../models/User";
import { sendEmail } from "./../../../utils/helpers";
import { createForgotPasswordLink } from "./createForgotPasswordLink";
import { forgotPasswordPrefix } from "./../../../utils/constants";
import { changePasswordSchema } from "./../../../utils/validations/userSchema";
import {
  formatYupErrors,
  handleErrors,
  isValidId
} from "./../../../utils/helpers";
import { userMessages } from "./../../../utils/validations/messages/userMessages";

export const sendForgotPasswordEmail = async (_, { email }, { redis }) => {
  const user = await User.findOne({ email });

  if (!user) return false;

  user.accountLocked = true;
  await user.save();

  if (process.env.NODE_ENV !== "test") {
    const url = await createForgotPasswordLink(
      process.env.FRONTEND_URL,
      user._id,
      redis
    );

    await sendEmail(email, url, "Click here to reset your password!");
  }

  return true;
};

export const changePassword = async (_, { newPassword, key }, { redis }) => {
  const redisKey = `${forgotPasswordPrefix}${key}`;
  let userId = null;
  try {
    await changePasswordSchema.validate({ newPassword }, { abortEarly: false });
    userId = await redis.getAsync(redisKey);

    if (!userId) {
      return handleErrors("newPassword", userMessages.invalidSession);
    }
    if (!isValidId(userId)) {
      return handleErrors("newPassword", userMessages.invalidUser);
    }
    const user = await User.findById(userId);
    if (!user)
      return handleErrors("newPassword", userMessages.userDoesNotExist);

    user.accountLocked = false;
    user.password = newPassword;
    await user.save();
    await redis.del(redisKey);

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
