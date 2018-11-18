import List from '../../../models/List';
import { formatYupErrors, handleErrors } from '../../../utils/helpers';
import { validListSchema } from '../../../utils/validations/listSchema';
import Board from '../../../models/Board';
import { listMessages } from '../../../utils/validations/messages/listMessages';

export const createList = async (_, { name, boardId }) => {
  try {
    await validListSchema.validate({ name }, { abortEarly: true });
    const board = await Board.findById(boardId);
    if (!board) return handleErrors('list', listMessages.boardDoesNotExist);
    const list = await List.create({ name, boardId });
    await board.addList(list._id);

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
