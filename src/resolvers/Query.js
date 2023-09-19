import { PrismaClient } from '@prisma/client';
import { authCheck } from '../utils/userValidation';
import getUserId from '../utils/getUserId';

const prisma = new PrismaClient();

const Query = {
  async users(parent, args, context, info) {
    const opArgs = {
      where: args.where,
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: args.orderBy || { createdAt: 'desc' },
    };

    if (args.query) {
      opArgs.where = {
        username: { contains: args.query },
      };
    }

    return prisma.user.findMany(opArgs);
  },
  async me(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
  async user(parent, args, context, info) {
    const user = await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
  async posts(parent, args, context, info) {
    const opArgs = {
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: args.orderBy || { createdAt: 'desc' },
    };

    if (args.query) {
      opArgs.where = {
        content: { contains: args.query },
      };
    }

    return prisma.post.findMany(opArgs);
  },
  async myFeed(parent, args, context, info) {
    const opArgs = {
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: args.orderBy || { createdAt: 'desc' },
    };

    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const follows = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        id: true,
        following: {
          select: {
            id: true,
          },
        },
      },
    });

    const authors = follows.map((follow) => ({
      id: follow.following.id,
    }));

    authors.push({ id: userId });

    return prisma.post.findMany({
      ...opArgs,
      where: {
        authorId: {
          in: authors.map((author) => author.id),
        },
      },
    });
  },
  async post(parent, args, context, info) {
    const post = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  },
  async followers(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const followingId = args.where ? args.where.id : userId;

    return prisma.follow.findMany({
      where: {
        followingId,
      },
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: args.orderBy || { createdAt: 'desc' },
    });
  },
  async followings(parent, args, context, info) {
    const userId = getUserId(context);

    await authCheck(prisma, userId);

    const followerId = args.where ? args.where.id : userId;

    return prisma.follow.findMany({
      where: {
        followerId,
      },
      take: args.first,
      skip: args.skip,
      cursor: args.after,
      orderBy: args.orderBy || { createdAt: 'desc' },
    });
  },
};

export default Query;
