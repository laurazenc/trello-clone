import List from '../../../models/List';
import { listMessages } from '../../../utils/validations/messages/listMessages';
import { handleErrors, formatYupErrors } from '../../../utils/helpers';

export const editList = async (_, { id, name }) => {
  try {
    const list = await List.findById(id);
    if (!list) return handleErrors('list', listMessages.listDoesNotExist);
    list.name = name;

    await list.save();

    return { result: true };
  } catch (err) {
    const { path, message } = formatYupErrors(err)[0];
    return handleErrors(path, message);
  }
};
