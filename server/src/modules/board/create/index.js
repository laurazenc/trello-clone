import Board from "./../../../models/Board";
import { validBoardSchema } from "./../../../utils/validations/boardSchema";
import { formatYupErrors, handleErrors } from "./../../../utils/helpers";

export const createBoard = async (_, { name }, { session }) => {
  try {
    await validBoardSchema.validate({ name }, { abortEarly: true });

    const newBoard = await Board.create({
      name,
      owner: session.userId
    });

    return { result: newBoard };
  } catch (e) {
    const { path, message } = formatYupErrors(e)[0];
    return handleErrors(path, message);
  }
};
