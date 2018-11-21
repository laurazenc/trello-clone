import mongoose from 'mongoose';
import faker from 'faker';
import { boardMessages } from '../../../utils/validations/messages/boardMessages';
import { TestServer } from '../../../utils/tests/TestServer';
import User from '../../../models/User';
import Board from '../../../models/Board';
import List from '../../../models/List';

import { connectMongoose, clearDatabase } from '../../../utils/tests/helper';

let user;
let anotherUser;
let board;
let list;
let list2;
const password = 'pass';
const listName = faker.lorem.words(8);

beforeAll(async () => {
  await connectMongoose();
  user = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.domainName(),
    password,
    confirmed: true,
  });
  anotherUser = await User.create({
    email: faker.internet.email(),
    displayName: faker.internet.domainName(),
    password,
    confirmed: true,
  });
  board = await Board.create({
    name: faker.lorem.words(2),
    owner: user._id,
  });
  list = await List.create({ name: listName, boardId: board._id });
  list2 = await List.create({ name: listName, boardId: board._id });
  await board.addList(list._id);
  await board.addList(list2._id);
});
afterAll(clearDatabase);

describe('Board > Delete Board', () => {
  const server = new TestServer();

  it('should return error if user is not authorized', async () => {
    const result = await server.deleteBoard(board._id);
    expect(result.errors[0].message).toBe('Not authorized');
  });

  it('should return error if a user which is not the owner tries to delete a board', async () => {
    await server.login(anotherUser.email, password);
    const result = await server.deleteBoard(board._id);
    expect(result.data.deleteBoard.errors[0].message).toBe(boardMessages.notOwner);
  });

  it('should return error if board does not exist', async () => {
    await server.login(user.email, password);
    const id = mongoose.Types.ObjectId();
    const result = await server.deleteBoard(id.toString());
    expect(result.data.deleteBoard.errors[0].message).toBe(boardMessages.doesNotExist);
  });

  it('should return true if the board has been removed', async () => {
    await server.login(user.email, password);
    const result = await server.deleteBoard(board._id);
    expect(result.data.deleteBoard.result).toBeTruthy();
  });

  it('should delete lists', async () => {
    const result = await List.findById(list._id);
    expect(result).toBe(null);
  });
});
