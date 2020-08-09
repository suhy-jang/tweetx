import 'core-js/stable';
import 'cross-fetch/polyfill';
import 'regenerator-runtime/runtime';
import axios from 'axios';
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
// import { extractFragmentReplacements } from 'prisma-binding';

beforeAll(seedDatabase);

const serverUrl = 'http://localhost:4000';

test('Should get users', async () => {
  const res = await axios.post(serverUrl, {
    query: getUsers,
  });

  const {
    data: { data, errors },
  } = res;

  expect(data.users.length).toBe(1);
});

test('Should get single user', async () => {
  const variables = {
    id: userOne.user.id,
  };

  const res = await axios.post(serverUrl, {
    query: getUser,
    variables,
  });

  const {
    data: { data, errors },
  } = res;

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

  const res = await axios.post(serverUrl, { query: createUser, variables });

  const {
    data: { data, errors },
  } = res;

  const exists = await prisma.exists.User({
    id: data.createUser.user.id,
  });

  expect(exists).toBe(true);
});

test('Should not register with invalid password', async () => {
  const variables = {
    data: {
      fullname: 'New Person 2',
      username: 'person2',
      email: 'person2@example.org',
      password: 'foo',
    },
  };

  const res = await axios.post(serverUrl, { query: createUser, variables });

  const {
    data: { data, errors },
  } = res;
  console.log(errors[0]);

  expect(data).toBe(null);
  expect(errors[0]).toHaveProperty('message');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      username: 'person_no',
      password: 'foo',
    },
  };

  await expect(
    axios.post(serverUrl, { query: login, variables }),
  ).rejects.toThrow();
});

test('Should fetch current user profile', async () => {
  const token = userOne.jwt;

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(serverUrl, { query: getMe }, config);

  const {
    data: { data, errors },
  } = res;

  expect(data).toHaveProperty('me');
  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.email).toBe(userOne.user.email);
});

test('Should update current user', async () => {
  const token = userOne.jwt;

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const variables = {
    data: {
      fullname: 'Momo',
    },
  };

  const res = await axios.post(
    serverUrl,
    { query: updateUser, variables },
    config,
  );

  const {
    data: { data, errors },
  } = res;

  expect(data.updateUser.fullname).toBe('Momo');
});

test('Should delete current user', async () => {
  const token = userOne.jwt;

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(serverUrl, { query: deleteUser }, config);

  const {
    data: { data, errors },
  } = res;

  const exists = await prisma.exists.User({
    id: data.deleteUser.id,
  });

  expect(exists).toBe(false);
});
