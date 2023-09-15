import 'core-js/stable';
import 'cross-fetch/polyfill';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  // Delete test data
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create User one
  userOne.user = await prisma.user.create({
    data: userOne.input,
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create Post one
  postOne.post = await prisma.post.create({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });
};

export { seedDatabase as default };
