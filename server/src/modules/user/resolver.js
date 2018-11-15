import { register } from "./register";
import { login } from "./login";
import { sendForgotPasswordEmail, changePassword } from "./forgotPassword";

export const resolvers = {
  Query: {
    hello: (_, { name }) => {
      return `Welcome!`;
    }
  },
  Mutation: {
    register,
    login,
    forgotPassword: sendForgotPasswordEmail,
    changePassword
  }
};
