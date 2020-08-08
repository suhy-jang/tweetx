import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';

const resolvers = {
  Query,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
