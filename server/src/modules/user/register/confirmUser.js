import mongoose from "mongoose";
import User from "./../../../models/User";
import redis from "./../../../redis";

import { isValidId } from "./../../../utils/helpers";

export const confirmUser = async (req, res, next) => {
  const { id } = req.params;
  let userId = null;
  try {
    userId = await redis.getAsync(id);
    if (userId) {
      if (!isValidId(userId)) {
        res.send("invalid");
        return next();
      }
      let user = await User.findById(userId);

      if (!user) {
        res.send("invalid");
        return next();
      }

      user.confirmed = true;
      await user.save();
      await redis.del(id);
      res.redirect(`${process.env.FRONTEND_URL}/t/confirmed-account`);
    } else {
      res.send("invalid");
    }
  } catch (e) {
    res.send("invalid");
  }
};
