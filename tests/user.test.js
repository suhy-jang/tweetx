import 'core-js/stable';
import 'cross-fetch/polyfill';
import 'regenerator-runtime/runtime';
import getClient from './utils/apolloClient';
import prisma from '../src/prisma';
import {
  createUser,
  login,
  getUsers,
  getUser,
  getMe,
  deleteUser,
  updateUser,
} from './utils/operations';
import seedDatabase, { userOne } from './utils/seedDatabase';

beforeAll(seedDatabase);

const client = getClient();

test('Should get all users', async () => {
  const res = await client.query({
    query: getUsers,
  });

  const { data } = res;

  expect(data.users.length).toBe(1);
});

test('Should get single user', async () => {
  const variables = {
    id: userOne.user.id,
  };

  const res = await client.query({
    query: getUser,
    variables,
  });

  const { data } = res;

  expect(data.user.username).toBe(userOne.user.username);
});

test('Should create a new user', async () => {
  const variables = {
    data: {
      fullname: 'New Person',
      username: 'person1',
      email: 'person1@example.org',
      password: 'foobar',
    },
  };

  const res = await client.mutate({ mutation: createUser, variables });

  const { data } = res;

  const exists = await prisma.exists.User({
    id: data.createUser.user.id,
  });

  expect(exists).toBe(true);
});

test('Should not register with invalid email', async () => {
  const variables = {
    data: {
      fullname: 'New Person 2',
      username: 'person2',
      email: 'xxx',
      password: 'foobar',
    },
  };

  const query = client.mutate({ mutation: createUser, variables });

  await expect(query).rejects.toThrow();
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      username: 'person_no',
      password: 'foo',
    },
  };

  const query = client.mutate({ mutation: login, variables });

  await expect(query).rejects.toThrow();
});

test('Should fetch current user profile', async () => {
  const client = getClient(userOne.jwt);

  const res = await client.query({ query: getMe });

  const { data } = res;

  expect(data).toHaveProperty('me');
  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.email).toBe(userOne.user.email);
});

test('Should update current user', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    data: {
      fullname: 'Momo',
    },
  };

  const res = await client.mutate({ mutation: updateUser, variables });

  const { data } = res;

  expect(data.updateUser.fullname).toBe('Momo');
});

test('Should delete current user', async () => {
  const client = getClient(userOne.jwt);

  const res = await client.mutate({ mutation: deleteUser });

  const { data } = res;

  const exists = await prisma.exists.User({
    id: data.deleteUser.id,
  });

  expect(exists).toBe(false);
});
