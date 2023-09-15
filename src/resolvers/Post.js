import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Post = {
  author: {
    resolve(parent, args, context, info) {
      return prisma.user.findFirst({
        where: {
          id: parent.authorId,
        },
      });
    },
  },
};

export default Post;
