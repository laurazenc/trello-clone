export const resolvers = {
  Query: {
    hello: (_, { name }) => {
      return `Welcome!`;
    }
  }
};
