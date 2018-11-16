import { register } from "./register";
import { login } from "./login";
import { me } from "./me";
import { sendForgotPasswordEmail, changePassword } from "./forgotPassword";

export const resolvers = {
  Query: {
    me
  },
  Mutation: {
    register,
    login,
    forgotPassword: sendForgotPasswordEmail,
    changePassword
  }
};
