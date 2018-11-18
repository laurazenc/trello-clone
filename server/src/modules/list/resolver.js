import { createList } from './create';
import { editList } from './edit';
import { deleteList } from './delete';

export const resolvers = {
  Mutation: {
    createList,
    editList,
    deleteList,
  },
};
