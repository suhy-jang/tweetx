import { GraphQLServer } from 'graphql-yoga';
import prisma from './prisma';
import { resolvers, fragmentReplacements } from './resolvers';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

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
});

// Set security headers
server.express.use(helmet());

// Prevent XSS attacks
server.express.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again after 15 minutes later.',
});
server.express.use(limiter);

// Prevent http param pollution
server.express.use(hpp());

// Enable CORS
server.express.use(cors());

export { server as default };
