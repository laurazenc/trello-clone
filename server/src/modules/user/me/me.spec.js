import { userMessages } from "../../../utils/validations/messages/userMessages";
import faker from "faker";

import { TestServer } from "./../../../utils/tests/TestServer";
import { connectMongoose, clearDatabase } from "./../../../utils/tests/helper";
import User from "./../../../models/User";

let confirmedUser;
const testPassword = "test";

beforeAll(async () => {
  connectMongoose();
  confirmedUser = await User.create({
    email: faker.internet.email(),
    password: testPassword,
    displayName: faker.internet.userName(),
    confirmed: true
  });
});

afterAll(clearDatabase);

describe("User > Me", () => {
  const server = new TestServer();
  it("should not be able to get user's profile if not logged", async () => {
    const result = await server.me();
    expect(result.data.me.errors[0].message).toBe(userMessages.invalidSession);
  });

  it("should get profile data for logged in useres", async () => {
    await server.login(confirmedUser.email, testPassword);
    const result = await server.me();
    expect(result.data.me.result.email).toBe(confirmedUser.email);
  });
});
