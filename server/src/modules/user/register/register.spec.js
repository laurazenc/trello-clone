import { userMessages } from "../../../utils/validations/messages/userMessages";
import faker from "faker";
import { TestServer } from "./../../../utils/tests/TestServer";

import { connectMongoose, clearDatabase } from "./../../../utils/tests/helper";

beforeAll(connectMongoose);
afterAll(clearDatabase);

describe("User > Register", () => {
  const server = new TestServer();
  it("should validate user data", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const displayName = faker.internet.userName();
    const confirmPassword = "not matching";

    const result = await server.register(
      email,
      displayName,
      password,
      confirmPassword
    );

    expect(result.data.register.errors[0].message).toBe(
      userMessages.confirmPasswordDoesntMatch
    );
  });

  it("should register new user", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const displayName = faker.internet.userName();
    const confirmPassword = password;

    const result = await server.register(
      email,
      displayName,
      password,
      confirmPassword
    );

    expect(result.data.register.result).toBe(true);
  });
});
