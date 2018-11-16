import { handleErrors, formatYupErrors } from "./../../../utils/helpers";
import User from "./../../../models/User";
import { userMessages } from "./../../../utils/validations/messages/userMessages";

export const me = async (_, __, { session }) => {
  try {
    if (!session.userId)
      return handleErrors("session", userMessages.invalidSession);

    const user = await User.findById(session.userId);
    if (!user) return handleErrors("session", userMessages.invalidSession);

    return { result: user };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
