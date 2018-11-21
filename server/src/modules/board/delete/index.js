import Board from '../../../models/Board';
import List from '../../../models/List';
import { boardMessages } from '../../../utils/validations/messages/boardMessages';
import { handleErrors, formatYupErrors } from '../../../utils/helpers';

export const deleteBoard = async (_, { id }, { session }) => {
  try {
    const board = await Board.findById(id);
    if (!board) return handleErrors('list', boardMessages.doesNotExist);

    if (board.owner.toString() !== session.userId) return handleErrors('list', boardMessages.notOwner);

    await List.remove({ _id: { $in: board.lists } });
    await Board.remove({ _id: id });

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
