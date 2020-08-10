import 'core-js/stable';
import 'cross-fetch/polyfill';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import prisma from '../src/prisma';
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from './utils/operations';
import { setAuthToken, setBaseUrl } from './utils/axiosDefaults';
import seedDatabase, { userOne, postOne } from './utils/seedDatabase';
// import { extractFragmentReplacements } from 'prisma-binding';

beforeAll(seedDatabase);
setBaseUrl();

test('Should get all posts', async () => {
  const res = await axios.post('/', {
    query: getPosts,
  });

  const {
    data: { data, errors },
  } = res;

  expect(data.posts.length).toBe(1);
});

test('Should get single post', async () => {
  const variables = {
    id: postOne.post.id,
  };

  const res = await axios.post('/', { query: getPost, variables });

  const {
    data: { data, errors },
  } = res;

  expect(data.post.content).toBe(postOne.post.content);
});

test('Should create a new post', async () => {
  setAuthToken(userOne.jwt);

  const variables = {
    data: {
      content: 'yoga center',
    },
  };

  const res = await axios.post('/', { query: createPost, variables });

  const {
    data: { data, errors },
  } = res;

  const exists = await prisma.exists.Post({
    id: data.createPost.id,
  });

  expect(exists).toBe(true);
});

test('Should update post', async () => {
  setAuthToken(userOne.jwt);

  const lemonJuice = 'lemon juice';

  const variables = {
    id: postOne.post.id,
    data: {
      content: lemonJuice,
    },
  };

  const res = await axios.post('/', { query: updatePost, variables });

  const {
    data: { data, errors },
  } = res;

  expect(data.updatePost.content).toBe(lemonJuice);
  expect(data.updatePost.updatedAt).not.toBe(postOne.updatedAt);
});

test('Should delete post', async () => {
  setAuthToken(userOne.jwt);

  const variables = {
    id: postOne.post.id,
  };

  const res = await axios.post('/', { query: deletePost, variables });

  const {
    data: { data, errors },
  } = res;

  const exists = await prisma.exists.Post({
    id: data.deletePost.id,
  });

  expect(exists).toBe(false);
});
