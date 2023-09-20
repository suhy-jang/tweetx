import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Follow = {
  follower: {
    resolve(parent, args, context, info) {
      return prisma.user.findFirst({
        where: {
          id: parent.followerId,
        },
      });
    },
  },
  following: {
    resolve(parent, args, context, info) {
      return prisma.user.findFirst({
        where: {
          id: parent.followingId,
        },
      });
    },
  },
};

export default Follow;
