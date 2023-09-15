require('@babel/polyfill/noConflict');
const server = require('./server').default;

const opts = {
  endpoint: '/graphql',
  port: 4000,
  tracing: true,
};

module.exports = async () => {
  global.httpServer = server.listen(opts, () => {
    console.log('The server is up');
  });
};
