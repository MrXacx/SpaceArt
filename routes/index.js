const server = require("./Server");
server.createServer();

server.createGetRoute('/', (req, res) => {
    res.send('Bem-vindo!');
});

server.on(9000);