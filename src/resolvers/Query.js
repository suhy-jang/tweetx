import getUserId from '../utils/getUserId';
import { authCheck } from '../utils/userValidation';

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      where: args.where,
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy || 'createdAt_DESC',
    };

    if (args.query) {
      opArgs.where = {
        ...opArgs.where,
        username_contains: args.query,
      };
    }

    return prisma.query.users(opArgs, info);
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    await authCheck(prisma, userId);

    return prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info,
    );
  },
  async user(parent, args, { prisma }, info) {
    const user = await prisma.query.user(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy || 'createdAt_DESC',
    };

    if (args.query) {
      opArgs.where = {
        content_contains: args.query,
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  async myFeed(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    await authCheck(prisma, userId);

    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy || 'createdAt_DESC',
    };

    const follows = await prisma.query.follows(
      {
        where: {
          follower: {
            id: userId,
          },
        },
      },
      `{
        id
        following {
          id
        }
      }`,
    );

    const authors = follows.map((follow) => ({
      id: follow.following.id,
    }));

    authors.push({ id: userId });

    return prisma.query.posts(
      {
        ...opArgs,
        where: {
          author: {
            OR: authors,
          },
        },
      },
      info,
    );
  },
  async post(parent, args, { prisma }, info) {
    const post = await prisma.query.post(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  },
  async followers(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    await authCheck(prisma, userId);

    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy || 'createdAt_DESC',
    };

    return prisma.query.follows(
      {
        ...opArgs,
        where: {
          following: {
            id: userId,
          },
        },
      },
      info,
    );
  },
  async followings(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    await authCheck(prisma, userId);

    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy || 'createdAt_DESC',
    };

    return prisma.query.follows(
      {
        ...opArgs,
        where: {
          follower: {
            id: userId,
          },
        },
      },
      info,
    );
  },
};

export { Query as default };
