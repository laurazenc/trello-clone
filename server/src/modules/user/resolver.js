import { register } from "./register";
import { login } from "./login";

export const resolvers = {
  Query: {
    hello: (_, { name }) => {
      return `Welcome!`;
    }
  },
  Mutation: {
    register,
    login
  }
};
