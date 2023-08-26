module.exports = Server;

const Server = {};

/**
   * Inicia configuração do servidor
   */
Server.createServer = () => {
  const app = require('express'); // Obtém pacote de servidor
  this.host = express();

  this.initBodyParser();
  this.initHandlebars(app);
}

/**
 * Configura handlebars
 * @param app Instância de Express
 */
Server.initHandlebars = (app) => {
  const path = require('path'); // Obtém manipulador de path
  this.host.use(app.static(path.join(__dirname, '../public'))); // Permite a interpretação de arquivos estáticos do diretório assets

  let exphbs = require('express-handlebars').create({
    // Configura handlebars
    defaultLayout: 'main',
    extname: 'handlebars',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  });

  // Configura manipulação de rotas
  this.host.engine('handlebars', exphbs.engine);
  this.host.set('view engine', 'handlebars');
  this.host.set('views', 'views/');
}

/**
 * Configura body-parser
 */
Server.initBodyParser = () => {
  const bodyParser = require('body-parser');
  this.host.use(bodyParser.urlencoded({ extended: false }));
  this.host.use(bodyParser.json());
}

/**
 * Cria uma callback para uma rota GET
 * @param route rota
 * @param func callback da rota
 */
Server.get = (
  route = '/',
  func = (req, res) => res.send('<h1>Página desconhecida</h1>')
) => { 
  this.host.get(route, func);
}

/**
 * Cria uma callback para uma rota POST
 * @param route rota
 * @param func callback da rota
 */
Server.post = (
  route = '/',
  func = (req, res) => res.send('<h1>Página desconhecida</h1>')
) => {
  this.host.post(route, func);
}

Server.on = (port = 9000) => {
  this.host.listen(port, () => console.log(`Servidor iniciado em http://localhost:${port}`));
}