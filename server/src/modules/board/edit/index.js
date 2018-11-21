import Board from '../../../models/Board';
import { boardMessages } from '../../../utils/validations/messages/boardMessages';
import { handleErrors, formatYupErrors } from '../../../utils/helpers';

export const editBoard = async (_, { id, name }) => {
  try {
    const board = await Board.findById(id);
    if (!board) return handleErrors('board', boardMessages.doesNotExist);
    board.name = name;

    await board.save();

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
