
const server = require('./Server');
server.createServer(); // Prepara servidor

// Gera rotas
server.get() // gera rota get padrão
server.post() // gera rota post padrão;

// Inicia servidor
server.on();

