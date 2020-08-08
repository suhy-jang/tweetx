const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};
    return prisma.query.users(opArgs, info);
  },
};

export { Query as default };
