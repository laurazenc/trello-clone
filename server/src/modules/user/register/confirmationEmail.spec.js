import fetch from "node-fetch";
import faker from "faker";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import redis from "./../../../redis";
import mongoose from "mongoose";

import { connectMongoose, clearDatabase } from "./../../../utils/tests/helper";
import User from "./../../../models/User";

beforeAll(connectMongoose);
afterAll(clearDatabase);

let userId = "";

beforeAll(async () => {
  await connectMongoose();
  const user = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.userName(),
    password: faker.internet.password()
  });
  userId = user._id;
});

afterAll(clearDatabase);

describe("User > Confirm email", () => {
  it("should return error if id does not exist", async () => {
    const url = await createConfirmEmailLink(
      process.env.SERVER_URL,
      "1234",
      redis
    );
    const response = await fetch(url);
    const text = await response.text();
    expect(text).toBe("invalid");
  });

  it("should return error if user does not exist", async () => {
    const id = mongoose.Types.ObjectId();
    const url = await createConfirmEmailLink(process.env.SERVER_URL, id, redis);
    const response = await fetch(url);
    const text = await response.text();
    expect(text).toBe("invalid");
  });
  it("should confirm user", async () => {
    const url = await createConfirmEmailLink(
      process.env.SERVER_URL,
      userId,
      redis
    );

    await fetch(url);
    const user = await User.findById(userId);
    expect(user.confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    redis.get(key, async (error, result) => {
      expect(result).toBeNull();
    });
  });
});
