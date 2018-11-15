import User from "./../../../models/User";
const {
  validUserSchema
} = require("./../../../utils/validations/userSchema.js");

const {
  userMessages
} = require("./../../../utils/validations/messages/userMessages");

const { handleErrors, formatYupErrors } = require("./../../../utils/helpers");

const { createConfirmEmailLink } = require("./createConfirmEmailLink");
const { sendEmail } = require("./../../../utils/helpers");

export const register = async (_, { email, ...rest }, { redis, url }) => {
  try {
    await validUserSchema.validate({ email, ...rest }, { abortEarly: false });
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists)
      return handleErrors("email", userMessages.emailAlreadyExists);
    const user = await User.create({
      email,
      ...rest
    });

    const confirmEmailUrl = await createConfirmEmailLink(url, user._id, redis);

    await sendEmail(
      email,
      confirmEmailUrl,
      "Click here to activate your account!"
    );

    return { result: true };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
