const server = require('./Server');
server.createServer();
server.createGetRoute();
server.on(9000);