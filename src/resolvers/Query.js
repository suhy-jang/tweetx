import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        username_contains: args.query,
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info,
    );
  },
  user(parent, args, { prisma }, info) {
    return prisma.query.user(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        content_contains: args.query,
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  post(parent, args, { prisma }, info) {
    return prisma.query.post(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
};

export { Query as default };
