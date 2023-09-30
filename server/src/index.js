import '@babel/polyfill/noConflict';
import seeder from './seeder';
import os from 'os';
import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';
import prisma from './prisma';
import { resolvers } from './resolvers';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { xssPrevention } from './middlewares/xssPrevention';
import typeDefs from './typedefs';

const app = express();

// Helmet middleware
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'development' ? false : undefined,
  }),
);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again after 15 minutes later.',
  });

  app.use(limiter);

  app.use('/', express.static('public'));
  app.get('*', (req, res, next) => {
    const routes = ['/graphql', '/graphql/playground'];

    if (routes.includes(req.url)) {
      return next();
    }

    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
    context({ request }) {
      return {
        request,
        prisma,
      };
    },
    middlewares: [xssPrevention],
  }),
});

const origin =
  process.env.NODE_ENV === 'production'
    ? process.env.ORIGIN
    : 'http://localhost:3000';

const opts = {
  endpoint: '/graphql',
  port: process.env.PORT || 4000,
  tracing: true,
  playground: '/graphql/playground',
  cors: {
    origin,
  },
};

app.use(yoga.graphqlEndpoint, yoga);

app.listen(opts, () => {
  console.log('The server is up');
  if (process.env.NODE_ENV === 'development') {
    seeder();
  }
});

process
  .on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled Rejection at: ', promise, 'reason: ', reason);
  })
  .on('uncaughtException', (err) => {
    console.warn(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
