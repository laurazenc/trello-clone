import mongoose from 'mongoose';
import faker from 'faker';
import { listMessages } from '../../../utils/validations/messages/listMessages';
import { TestServer } from '../../../utils/tests/TestServer';
import User from '../../../models/User';
import Board from '../../../models/Board';

import { connectMongoose, clearDatabase } from '../../../utils/tests/helper';

let user;
let board;
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
  board = await Board.create({
    name: faker.lorem.words(2),
    owner: user._id,
  });
});
afterAll(clearDatabase);

describe('Lists > Create List', () => {
  const server = new TestServer();

  it('should return error if user is not authorized', async () => {
    const result = await server.createList(listName, board._id);
    expect(result.errors[0].message).toBe('Not authorized');
  });

  it('should return error if board does not exist', async () => {
    await server.login(user.email, password);
    const id = mongoose.Types.ObjectId();
    const result = await server.createList(listName, id.toString());
    expect(result.data.createList.errors[0].message).toBe(listMessages.boardDoesNotExist);
  });

  it('should return true if the list has been correctly created', async () => {
    await server.login(user.email, password);
    const result = await server.createList(listName, board._id);
    expect(result.data.createList.result).toBe(true);
  });

  it('should have include the list in the baord', async () => {
    await server.login(user.email, password);
    const result = await Board.findById(board._id);
    expect(result.lists.length).toBe(1);
  });
});
