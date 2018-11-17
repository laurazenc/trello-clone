import { boardMessages } from "../../../utils/validations/messages/boardMessages";
import faker from "faker";
import { TestServer } from "./../../../utils/tests/TestServer";
import User from "./../../../models/User";

import { connectMongoose, clearDatabase } from "./../../../utils/tests/helper";

let user;
const password = "pass";

beforeAll(async () => {
  await connectMongoose();
  user = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.domainName(),
    password,
    confirmed: true
  });
});
afterAll(clearDatabase);

describe("Board > Create", () => {
  const server = new TestServer();
  it("should not be able to create a board without being logged in", async () => {
    const name = null;

    const result = await server.createBoard(name);
    expect(result.errors[0].message).toBe("Not authorized");
  });

  it("should validate board data", async () => {
    const name = "2";

    await server.login(user.email, password);
    const result = await server.createBoard(name);
    expect(result.data.createBoard.errors[0].message).toBe(
      boardMessages.nameNotLongEnough
    );
  });

  it("should create new board", async () => {
    const name = faker.lorem.words(3);
    const result = await server.createBoard(name);
    expect(result.data.createBoard.result.name).toBe(name);
  });
});
