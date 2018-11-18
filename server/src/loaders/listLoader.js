import DataLoader from 'dataloader';
import List from '../models/List';

const batchList = async (ids) => {
  const lists = await List.find({ _id: { $in: ids } });
  const listMap = {};
  lists.forEach((u) => {
    listMap[u._id] = u;
  });

  return ids.map(id => listMap[id]);
};

export const listLoader = () => new DataLoader(batchList);
