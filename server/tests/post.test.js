import 'core-js/stable';
import 'cross-fetch/polyfill';
import 'regenerator-runtime/runtime';
import { PrismaClient } from '@prisma/client';
import getClient from './utils/apolloClient';
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from './utils/operations';
import seedDatabase, { userOne, postOne } from './utils/seedDatabase';

const prisma = new PrismaClient();

beforeAll(seedDatabase);
const client = getClient();

test('Should get all posts', async () => {
  const res = await client.query({
    query: getPosts,
  });

  const { data } = res;

  expect(data.posts.length).toBe(1);
});

test('Should get single post', async () => {
  const variables = {
    id: postOne.post.id,
  };

  const res = await client.query({ query: getPost, variables });

  const { data } = res;

  expect(data.post.content).toBe(postOne.post.content);
});

test('Should create a new post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    data: {
      content: 'yoga center',
    },
  };

  const res = await client.mutate({ mutation: createPost, variables });

  const { data } = res;

  const post = await prisma.post.findUnique({
    where: {
      id: data.createPost.id,
    },
  });

  expect(post).toBeTruthy();
});

test('Should update post', async () => {
  const client = getClient(userOne.jwt);

  const lemonJuice = 'lemon juice';

  const variables = {
    id: postOne.post.id,
    data: {
      content: lemonJuice,
    },
  };

  const res = await client.mutate({ mutation: updatePost, variables });

  const { data } = res;

  expect(data.updatePost.content).toBe(lemonJuice);
  expect(data.updatePost.updatedAt).not.toBe(postOne.updatedAt);
});

test('Should delete post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: postOne.post.id,
  };

  const res = await client.mutate({ mutation: deletePost, variables });

  const { data } = res;

  const post = await prisma.post.findUnique({
    where: {
      id: data.deletePost.id,
    },
  });

  expect(post).toBeFalsy();
});
