import Board from "./../../../models/Board";

export const getUsersBoards = async (_, __, { session }) => {
  return Board.find({ owner: session.userId }).sort({ updatedAt: -1 });
};
