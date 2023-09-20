import 'core-js/stable';
import 'cross-fetch/polyfill';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { userOne } from './seedDatabase';

const prisma = new PrismaClient();

export const userTwo = {
  input: {
    username: 'maurice_moss',
    fullname: 'Maurice Moss',
    email: 'moss@example.org',
    password: bcrypt.hashSync('foobar'),
  },
  user: undefined,
  jwt: undefined,
};

export const userThree = {
  input: {
    username: 'roy_trenneman',
    fullname: 'Roy Trenneman',
    email: 'roy@example.org',
    password: bcrypt.hashSync('foobar'),
  },
  user: undefined,
  jwt: undefined,
};

export const postTwo = {
  input: {
    content: 'born of yggdrasil',
  },
  post: undefined,
};

const seedDatabase = async () => {
  // Create User two
  userTwo.user = await prisma.user.create({
    data: userTwo.input,
  });

  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

  // Create User three
  userThree.user = await prisma.user.create({
    data: userThree.input,
  });

  userThree.jwt = jwt.sign(
    { userId: userThree.user.id },
    process.env.JWT_SECRET,
  );

  // Create Post two
  postTwo.post = await prisma.post.create({
    data: {
      ...postTwo.input,
      authorId: userTwo.user.id,
    },
  });

  // Create Follow userOne -> userTwo
  const followOne = await prisma.follow.create({
    data: {
      followerId: userOne.user.id,
      followingId: userTwo.user.id,
    },
  });

  // Create Follow userThree -> userOne
  const followTwo = await prisma.follow.create({
    data: {
      followerId: userThree.user.id,
      followingId: userOne.user.id,
    },
  });
};

export { seedDatabase as default };
