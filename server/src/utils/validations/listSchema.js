import * as yup from 'yup';
import { listMessages } from './messages/listMessages';

const nameValidation = yup
  .string()
  .required(listMessages.nameIsRequired)
  .min(3, listMessages.nameNotLongEnough)
  .max(255);

export const validListSchema = yup.object().shape({
  name: nameValidation,
});
