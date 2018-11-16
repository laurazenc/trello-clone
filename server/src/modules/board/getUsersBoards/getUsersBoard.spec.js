import { boardMessages } from "../../../utils/validations/messages/boardMessages";
import faker from "faker";
import { TestServer } from "./../../../utils/tests/TestServer";
import User from "./../../../models/User";
import Board from "./../../../models/Board";

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

describe("Boards > Get user's boards ", () => {
  const server = new TestServer();

  it("should return error if user is not authorized", async () => {
    const result = await server.getUsersBoards();
    expect(result.errors[0].message).toBe("Not authorized");
  });

  it("should return an empty array if user has no boards created", async () => {
    await server.login(user.email, password);
    const result = await server.getUsersBoards();
    expect(result.data.getUsersBoards.length).toBe(0);
  });

  it("should return an array of boards if the user has any", async () => {
    await server.login(user.email, password);
    await Board.create({ name: faker.company.companyName, owner: user._id });
    const result = await server.getUsersBoards();
    expect(result.data.getUsersBoards.length).toBe(1);
  });
});
