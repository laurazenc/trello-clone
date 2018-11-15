import { v4 } from "uuid";

export const storeLinkToRedis = (id, userId, redis) => {
  const twentyFourHours = 60 * 60 * 24;

  return redis.set(id, userId.toString(), "ex", twentyFourHours);
};

export const createConfirmEmailLink = async (url, userId, redis) => {
  const id = v4();

  await storeLinkToRedis(id, userId, redis);

  return `${url}/confirm/${id}`;
};
