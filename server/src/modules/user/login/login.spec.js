import { userMessages } from "../../../utils/validations/messages/userMessages";
import { graphql } from "graphql";
import faker from "faker";

import { TestServer } from "./../../../utils/tests/TestServer";
import { connectMongoose, clearDatabase } from "./../../../utils/tests/helper";
import User from "./../../../models/User";

let notConfirmedUser, confirmedUser;
const testPassword = "test";

beforeAll(async () => {
  connectMongoose();
  notConfirmedUser = await User.create({
    email: faker.internet.email(),
    password: testPassword,
    displayName: faker.internet.userName()
  });
  confirmedUser = await User.create({
    email: faker.internet.email(),
    password: testPassword,
    displayName: faker.internet.userName(),
    confirmed: true
  });
});

afterAll(clearDatabase);

describe("User > Login", () => {
  const server = new TestServer();
  it("should not log not confirmed users in", async () => {
    const result = await server.login(notConfirmedUser.email, testPassword);
    expect(result.data.login.errors[0].message).toBe(
      userMessages.emailNotConfirmed
    );
  });

  it("should log confirmed users in", async () => {
    const result = await server.login(confirmedUser.email, testPassword);
    expect(result.data.login.session).toBeDefined();
  });
});
