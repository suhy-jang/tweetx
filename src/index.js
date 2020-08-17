import '@babel/polyfill/noConflict';
import server from './server';
import seeder from './seeder';
import os from 'os';
import path from 'path';
import express from 'express';

const host =
  'http://' +
  (process.env.NODE_ENV === 'production' ? os.hostname() : 'localhost');

const opts = {
  endpoint: '/graphql',
  port: process.env.PORT || 4000,
  tracing: true,
  playground: '/graphql/playground',
  cors: {
    origin: [host + ':3000'],
  },
};

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  server.express.use('/', express.static('public'));
  server.express.get('*', (req, res, next) => {
    const routes = ['/graphql', '/graphql/playground'];

    if (routes.includes(req.url)) {
      return next();
    }

    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });
}

server.start(opts, () => {
  console.log('The server is up');
  if (process.env.NODE_ENV === 'development') {
    seeder();
  }
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Exit process
  process.exit(1);
});
