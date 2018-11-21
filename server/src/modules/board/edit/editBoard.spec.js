import mongoose from 'mongoose';
import faker from 'faker';
import { boardMessages } from '../../../utils/validations/messages/boardMessages';
import { TestServer } from '../../../utils/tests/TestServer';
import User from '../../../models/User';
import Board from '../../../models/Board';
import List from '../../../models/List';

import { connectMongoose, clearDatabase } from '../../../utils/tests/helper';

let user;
let board;
let list;
const password = 'pass';
const boardName = faker.lorem.words(8);

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

describe('Board > Edit Board', () => {
  const server = new TestServer();

  it('should return error if user is not authorized', async () => {
    const result = await server.editBoard(board._id, boardName);
    expect(result.errors[0].message).toBe('Not authorized');
  });

  it('should return error if board does not exist', async () => {
    await server.login(user.email, password);
    const id = mongoose.Types.ObjectId();
    const result = await server.editBoard(id.toString(), boardName);
    expect(result.data.editBoard.errors[0].message).toBe(boardMessages.doesNotExist);
  });

  it('should return true if the list has been edited', async () => {
    await server.login(user.email, password);
    const result = await server.editBoard(board._id, faker.lorem.words(3));
    expect(result.data.editBoard.result).toBeTruthy();
  });
});
