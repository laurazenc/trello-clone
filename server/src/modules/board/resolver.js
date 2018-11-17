import { getUsersBoards } from "./getUsersBoards";
import { createBoard } from "./create";

export const resolvers = {
  Board: {
    owner: ({ owner }, _, { userLoader }) => userLoader.load(owner)
  },
  Query: {
    getUsersBoards
  },
  Mutation: {
    createBoard
  }
};
