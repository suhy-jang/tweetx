import getUserId from '../utils/getUserId';
import { generateToken } from '../utils/jwtToken';
import { hashPassword, verifyPassword } from '../utils/hashPassword';

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
  async login(parent, args, { prisma, request }, info) {
    const user = (
      await prisma.query.users({
        where: {
          OR: [{ email: args.data.email }, { username: args.data.email }],
        },
      })
    )[0];

    if (!user) {
      throw new Error('Unable to authenticate');
    }

    const isMatch = await verifyPassword(args.data.password, user.password);

    if (!isMatch) {
      throw new Error('Unable to authenticate');
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({
      where: {
        id: userId,
      },
      info,
    });
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId,
      },
      data: args.data,
    });
  },
  createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost({
      data: args.data,
    });
  },
  deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    });
  },
  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost({
      where: {
        id: args.id,
      },
      data: args.data,
    });
  },
  async follow(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const follow = (
      await prisma.query.follows({
        where: {
          follower: {
            id: userId,
          },
        },
      })
    )[0];

    if (follow) {
      throw new Error('Failed follow');
    }

    return prisma.mutation.createFollow(
      {
        data: {
          follower: {
            connect: {
              id: userId,
            },
          },
          following: {
            connect: {
              id: args.id,
            },
          },
        },
      },
      info,
    );
  },
  async unfollow(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const follow = (
      await prisma.query.follows({
        where: {
          follower: {
            id: userId,
          },
        },
      })
    )[0];

    if (!follow) {
      throw new Error('Failed unfollow');
    }

    return prisma.mutation.deleteFollow(
      {
        where: {
          id: follow.id,
        },
      },
      info,
    );
  },
};

export { Mutation as default };
