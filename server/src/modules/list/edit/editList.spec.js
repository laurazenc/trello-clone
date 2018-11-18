import mongoose from 'mongoose';
import faker from 'faker';
import { listMessages } from '../../../utils/validations/messages/listMessages';
import { TestServer } from '../../../utils/tests/TestServer';
import User from '../../../models/User';
import Board from '../../../models/Board';
import List from '../../../models/List';

import { connectMongoose, clearDatabase } from '../../../utils/tests/helper';

let user;
let board;
let list;
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
  list = await List.create({ name: faker.lorem.words(3), boardId: board._id });
});
afterAll(clearDatabase);

describe('Lists > Edit List', () => {
  const server = new TestServer();

  it('should return error if user is not authorized', async () => {
    const result = await server.editList(listName, board._id);
    expect(result.errors[0].message).toBe('Not authorized');
  });

  it('should return error if list does not exist', async () => {
    await server.login(user.email, password);
    const id = mongoose.Types.ObjectId();
    const result = await server.editList(id.toString(), faker.lorem.words(3));
    expect(result.data.editList.errors[0].message).toBe(listMessages.listDoesNotExist);
  });

  it('should return true if the list has been edited', async () => {
    await server.login(user.email, password);
    const result = await server.editList(list._id, faker.lorem.words(3));
    expect(result.data.editList.result).toBeTruthy();
  });
});
