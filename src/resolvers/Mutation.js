import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import { generateToken } from '../utils/jwtToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);

    const emailTaken = await prisma.exists.User({
      email: args.data.email,
    });

    if (emailTaken) {
      throw new Error('Email already taken.');
    }

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
};

export { Mutation as default };
