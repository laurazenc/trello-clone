import Board from '../../../models/Board';

import { handleErrors } from '../../../utils/helpers';
import { boardMessages } from '../../../utils/validations/messages/boardMessages';

export const getBoard = async (_, { boardId }, { session }) => {
  const board = await Board.findById(boardId);
  // board exists
  if (!board) return handleErrors('board', boardMessages.doesNotExist);

  // board is yours
  if (board.owner.toString() !== session.userId) return handleErrors('board', boardMessages.notOwner);

  return { result: board };
};
