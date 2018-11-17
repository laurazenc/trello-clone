import DataLoader from "dataloader";
import User from "../models/User";

const batchUser = async ids => {
  const users = await User.find({ _id: { $in: ids } });
  const userMap = {};
  users.forEach(u => {
    userMap[u._id] = u;
  });

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader(batchUser);
