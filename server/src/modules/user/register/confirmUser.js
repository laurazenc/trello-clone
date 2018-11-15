import mongoose from "mongoose";
import User from "./../../../models/User";
import redis from "./../../../redis";

import { handleErrors, formatYupErrors } from "./../../../utils/helpers";

export const confirmUser = async (req, res) => {
  const { id } = req.params;
  let userId = null;
  redis.get(id, async (error, result) => {
    if (error) {
      const { path, message } = formatYupErrors(error)[0];
      return handleErrors(path, message);
    }
    userId = result;
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) res.send("invalid");
      let user = await User.findById(userId);
      if (!user) res.send("invalid");

      user.confirmed = true;
      await user.save();
      await redis.del(id);
      res.redirect(`${process.env.FRONTEND_URL}/t/confirmed-account`);
    } else {
      res.send("invalid");
    }
  });
};
