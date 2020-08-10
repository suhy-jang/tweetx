import '@babel/polyfill/noConflict';
import server from './server';
import seeder from './seeder';

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up');
  seeder();
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Exit process
  process.exit(1);
});
