import { register } from "./register";
import { login } from "./login";
import { sendForgotPasswordEmail, changePassword } from "./forgotPassword";

export const resolvers = {
  Mutation: {
    register,
    login,
    forgotPassword: sendForgotPasswordEmail,
    changePassword
  }
};
