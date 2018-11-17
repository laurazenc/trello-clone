import * as yup from "yup";
import { boardMessages } from "./messages/boardMessages";

const nameValidation = yup
  .string()
  .required(boardMessages.nameIsRequired)
  .min(3, boardMessages.nameNotLongEnough)
  .max(255);

export const validBoardSchema = yup.object().shape({
  name: nameValidation
});
