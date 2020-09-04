import { GraphQLServer } from 'graphql-yoga';
import prisma from './prisma';
import { resolvers } from './resolvers';
import { extractFragmentReplacements } from 'prisma-binding';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { xssPrevention } from './middlewares/xssPrevention';

const fragmentReplacements = extractFragmentReplacements(resolvers);

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      prisma,
      request,
    };
  },
  fragmentReplacements,
  middlewares: [xssPrevention],
});

// Set security headers
server.express.use(helmet());

server.express.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'self'", 'data:'],
      baseUri: ["'self'"],
      blockAllMixedContent: true,
      fontSrc: ["'self'", 'https:', 'data:'],
      frameAncestors: ["'self'"],
      imgSrc: ['*'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      upgradeInsecureRequests: true,
    },
    reportOnly: false,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again after 15 minutes later.',
});
server.express.use(limiter);

export { server as default };
