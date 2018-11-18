import { getBoard } from './getBoard';
import { getUsersBoards } from './getUsersBoards';
import { createBoard } from './create';

export const resolvers = {
  Board: {
    lists: async ({ lists }, _, { listLoader }) => {
      const loaderLists = [];
      lists.forEach((list) => {
        loaderLists.push(listLoader.load(list));
      });
      const loaders = await Promise.all(loaderLists);
      return loaders;
    },
    owner: ({ owner }, _, { userLoader }) => userLoader.load(owner),
  },
  Query: {
    getUsersBoards,
    getBoard,
  },
  Mutation: {
    createBoard,
  },
};
