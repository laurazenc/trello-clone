import User from "./../../../models/User";
const {
  validUserSchema
} = require("./../../../utils/validations/userSchema.js");

const {
  userMessages
} = require("./../../../utils/validations/messages/userMessages");

const { handleErrors, formatYupErrors } = require("./../../../utils/helpers");

export const register = async (_, { email, ...rest }, __) => {
  try {
    await validUserSchema.validate({ email, ...rest }, { abortEarly: false });
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists)
      return handleErrors("email", userMessages.emailAlreadyExists);

    await User.create({
      email,
      ...rest
    });

    return { result: true };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
