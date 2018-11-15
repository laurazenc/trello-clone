import faker from "faker";
import User from "./../../../models/User";

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

describe("User > Forgot password email", () => {
  const server = new TestServer();

  it("should send forgot password email and block user account", async () => {
    const result = await server.forgotPassword(user.email);
    expect(result.data.forgotPassword).toBe(true);
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.accountLocked).toBe(true);
  });
});
