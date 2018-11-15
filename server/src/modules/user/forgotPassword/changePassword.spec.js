import faker from "faker";
import { createForgotPasswordLink } from "./createForgotPasswordLink";
import { userMessages } from "./../../../utils/validations/messages/userMessages";
import User from "./../../../models/User";
import redis from "./../../../redis";

import { connectMongoose, clearDatabase } from "./../../../utils/tests/helper";
import { TestServer } from "./../../../utils/tests/TestServer";

beforeAll(connectMongoose);
afterAll(clearDatabase);

let user;

beforeAll(async () => {
  await connectMongoose();
  user = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.userName(),
    password: faker.internet.password(),
    confirmed: true
  });
});

afterAll(clearDatabase);

describe("User > Change password", () => {
  const server = new TestServer();

  it("should handle not existing emails", async () => {
    const url = await createForgotPasswordLink(
      process.env.FRONTEND_URL,
      "5678",
      redis
    );

    const parts = url.split("/");
    const key = parts[parts.length - 1];

    const newPassword = "new password";
    const result = await server.changePassword(newPassword, key);

    expect(result.data.changePassword.errors[0].message).toBe(
      userMessages.invalidUser
    );
  });

  it("should update user password and unblock the account", async () => {
    const url = await createForgotPasswordLink(
      process.env.FRONTEND_URL,
      user._id,
      redis
    );

    const parts = url.split("/");
    const key = parts[parts.length - 1];

    const newPassword = "new password";
    const result = await server.changePassword(newPassword, key);
    expect(result.data.changePassword.result).toBe(true);

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.accountLocked).toBe(false);

    const loginResult = await server.login(updatedUser.email, newPassword);
    expect(loginResult.data.login.session).toBeDefined();
  });
});
