import faker from 'faker';
import mongoose from 'mongoose';
import { boardMessages } from '../../../utils/validations/messages/boardMessages';
import { TestServer } from '../../../utils/tests/TestServer';
import User from '../../../models/User';
import Board from '../../../models/Board';
import List from '../../../models/List';

import { connectMongoose, clearDatabase } from '../../../utils/tests/helper';

let user;
let otherUser;
let board;
const password = 'pass';

beforeAll(async () => {
  await connectMongoose();
  user = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.domainName(),
    password,
    confirmed: true,
  });
  otherUser = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.domainName(),
    password,
    confirmed: true,
  });
  board = await Board.create({
    name: faker.internet.color(),
    owner: user._id,
  });
});
afterAll(clearDatabase);

describe('Boards > Get board ', () => {
  const server = new TestServer();

  it('should return error if user is not authorized', async () => {
    const result = await server.getBoard(board._id);
    expect(result.errors[0].message).toBe('Not authorized');
  });

  it('should return error if board does not exist', async () => {
    await server.login(user.email, password);
    const result = await server.getBoard(mongoose.Types.ObjectId());
    expect(result.data.getBoard.errors[0].message).toBe(boardMessages.doesNotExist);
  });

  it('should return an error if the requested user is not owner', async () => {
    await server.login(otherUser.email, password);
    const result = await server.getBoard(board._id);
    expect(result.data.getBoard.errors[0].message).toBe(boardMessages.notOwner);
  });

  it('should return board info if the requested user is the owner', async () => {
    await server.login(user.email, password);
    const result = await server.getBoard(board._id);
    expect(result.data.getBoard.result.name).toBe(board.name);
  });

  it('should return board lists if has any', async () => {
    await server.login(user.email, password);
    const list = await List.create({
      name: faker.internet.color(),
      boardId: board._id,
    });
    board.addList(list._id);
    const result = await server.getBoard(board._id);
    expect(result.data.getBoard.result.lists.length).toBe(1);
  });
});
