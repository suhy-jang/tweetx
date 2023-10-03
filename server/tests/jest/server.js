import '@babel/polyfill/noConflict';
import { createSchema, createYoga } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '../../src/resolvers';
import { xssPrevention } from '../../src/middlewares/xssPrevention';
import typeDefs from '../../src/typedefs';
import express from 'express';

const app = express();
const prisma = new PrismaClient();

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
    context(request) {
      return {
        prisma,
        request,
      };
    },
    middlewares: [xssPrevention],
  }),
});

app.use(yoga.graphqlEndpoint, yoga);

export { app as default };
