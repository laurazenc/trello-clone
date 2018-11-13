import User from "./../../../models/User";
import { userMessages } from "./../../../utils/validations/messages/userMessages";
import { handleErrors } from "./../../../utils/helpers";
import { userSessionIdPrefix } from "./../../../utils/constants";

export const login = async (
  _,
  { email, password },
  { req, session, redis }
) => {
  const user = await User.findOne({ email });

  if (!user) {
    return handleErrors("email", userMessages.invalidLogin);
  }

  const valid = await user.authenticateUser(password);

  if (!valid) {
    return handleErrors("password", userMessages.invalidLogin);
  }

  if (!user.confirmed) {
    return handleErrors("confirmed", userMessages.emailNotConfirmed);
  }

  if (user.accountLocked) {
    return handleErrors("accountLocked", userMessages.accountLocked);
  }

  session.userId = user._id;
  if (req.sessionID) {
    await redis.lpush(`${userSessionIdPrefix}${user._id}`, req.sessionID);
  }

  return { session: req.sessionID };
};
