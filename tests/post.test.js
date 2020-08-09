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
import seedDatabase, { postOne } from './utils/seedDatabase';
// import { extractFragmentReplacements } from 'prisma-binding';

beforeAll(seedDatabase);

const serverUrl = 'http://localhost:4000';

test('Should get posts', async () => {
  const res = await axios.post(serverUrl, {
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

  const res = await axios.post(serverUrl, { query: getPost, variables });

  const {
    data: { data, errors },
  } = res;

  expect(data.post.content).toBe(postOne.post.content);
});

test('Should create a new post', async () => {
  const variables = {
    data: {
      content: 'yoga center',
    },
  };

  const res = await axios.post(serverUrl, { query: createPost, variables });

  const {
    data: { data, errors },
  } = res;

  const exists = await prisma.exists.Post({
    id: data.createPost.id,
  });

  expect(exists).toBe(true);
});

test('Should update post', async () => {
  const lemonJuice = 'lemon juice';

  const variables = {
    id: postOne.post.id,
    data: {
      content: lemonJuice,
    },
  };

  const res = await axios.post(serverUrl, { query: updatePost, variables });

  const {
    data: { data, errors },
  } = res;

  expect(data.updatePost.content).toBe(lemonJuice);
  expect(data.updatePost.updatedAt).not.toBe(postOne.updatedAt);
});

test('Should delete post', async () => {
  const variables = {
    id: postOne.post.id,
  };

  const res = await axios.post(serverUrl, { query: deletePost, variables });

  const {
    data: { data, errors },
  } = res;

  const exists = await prisma.exists.Post({
    id: data.deletePost.id,
  });

  expect(exists).toBe(false);
});
