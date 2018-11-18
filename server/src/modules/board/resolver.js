import { getBoard } from './getBoard';
import { getUsersBoards } from './getUsersBoards';
import { createBoard } from './create';
import { editBoard } from './edit';
import { deleteBoard } from './delete';

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
    editBoard,
    deleteBoard,
  },
};
