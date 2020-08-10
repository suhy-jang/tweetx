import 'core-js/stable';
import 'cross-fetch/polyfill';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

export const userOne = {
  input: {
    username: 'jen_barber',
    fullname: 'Jen Barber',
    email: 'jen@example.org',
    password: bcrypt.hashSync('foobar'),
  },
  user: undefined,
  jwt: undefined,
};

export const postOne = {
  input: {
    content: 'king of titans',
  },
  post: undefined,
};

const seedDatabase = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL *= 10;

  // Delete test data
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.deleteManyPosts();

  // Create User one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  if (!userOne.user) {
    console.error('User not exists');
    process.exit(1);
  }

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create Post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

  if (!postOne.post) {
    console.error('Post not exists');
    process.exit(1);
  }
};

export { seedDatabase as default };
