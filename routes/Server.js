module.exports = {
	createServer(){
		const path = require('path'); // Obtém manipulador de path
		const express = require('express'); // Obtém pacote de servidor
		this.host = express();
		
		this.prepareBodyParser();
		this.prepateHandlebars(path, express);
			
	},
	
	prepareBodyParser(){
		const bodyParser = require('body-parser');
		this.host.use(bodyParser.urlencoded({ extended: false }));
		this.host.use(bodyParser.json());
	},
	
	prepateHandlebars(path, express){
		this.host.use(express.static(path.join(__dirname, '../../public'))); // Permite a interpretação de arquivos estáticos do diretório assets
		
		const exphbs = require('express-handlebars').create({ // Configura handlebars
			defaultLayout: 'main',
			extname: 'handlebars',
			layoutsDir: path.join(__dirname, '../../views/layouts'),
		});		
		
		// Configura manipulação de rotas
		this.host.engine('handlebars', exphbs.engine);
		this.host.set('view engine', 'handlebars');
		this.host.set('views', '../../views/');
	},
	
	createGetRoute(route = '/', func = (req, res) => res.send('<h1>Página desconhecida</h1>')){
		// Cria uma callback para uma rota
		this.host.get(route, func);
	},
	
	createPostRoute(route = '/', func = (req, res) => res.send('<h1>Página desconhecida</h1>')){
		// Cria uma callback para uma rota
		this.host.post(route, func);
	},
	
	on(port=9000){
		// Inicia servidor
		this.host.listen(port, () => console.log(`Servidor iniciado em http://localhost:${port}`));
	}
}
