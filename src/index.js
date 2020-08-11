import '@babel/polyfill/noConflict';
import server from './server';
import seeder from './seeder';

const host = 'http://localhost';

const opts = {
  endpoint: '/graphql',
  port: process.env.PORT || 4000,
  tracing: true,
  playground: '/graphql/playground',
  cors: {
    origin: [host + ':3000'],
  },
};

server.start(opts, () => {
  console.log('The server is up');
  seeder();
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Exit process
  process.exit(1);
});
