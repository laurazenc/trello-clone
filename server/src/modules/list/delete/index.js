import List from '../../../models/List';
import { listMessages } from '../../../utils/validations/messages/listMessages';
import { handleErrors, formatYupErrors } from '../../../utils/helpers';
import Board from '../../../models/Board';

export const deleteList = async (_, { id }) => {
  try {
    const list = await List.findById(id);
    if (!list) return handleErrors('list', listMessages.listDoesNotExist);
    await Board.updateOne({ _id: list.boardId }, { $pull: { lists: list._id } });
    await List.remove({ _id: id });

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
