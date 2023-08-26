
const server = require('./Server');
server.createServer(); // Prepara servidor

// Gera rotas
server.createGetRoute() // gera rota get padrão
server.createPostRoute() // gera rota post padrão;

// Inicia servidor
server.on();

