const isAuthenticated = async (resolve, root, args, context, info) => {
  if (!context.session.userId) {
    throw new Error('Not authorized');
  }
  return resolve(root, args, context, info);
};

export const authMiddleware = {
  Query: {
    getUsersBoards: isAuthenticated,
    getBoard: isAuthenticated,
  },
  Mutation: {
    createBoard: isAuthenticated,
    createList: isAuthenticated,
  },
};
