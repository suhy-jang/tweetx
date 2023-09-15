import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = {
  email: {
    resolve(parent, args, context, info) {
      if (context.userId && context.userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    },
  },
  posts: {
    resolve(parent, args, context, info) {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    },
  },
  followers: {
    resolve(parent, args, context, info) {
      return prisma.follow.findMany({
        where: {
          followingId: parent.id,
        },
      });
    },
  },
  followings: {
    resolve(parent, args, context, info) {
      return prisma.follow.findMany({
        where: {
          followerId: parent.id,
        },
      });
    },
  },
};

export default User;
