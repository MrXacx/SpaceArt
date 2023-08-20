function saudacao(name){
	let hour = new Date().getHours();
	
	if(hour < 12){
		return `Bom dia, ${name}!`;
	}
	
	return `Boa ${hour <= 18 ? 'tarde' : 'noite' }, ${name}!`
}
	
const server = require('./Server');
server.createServer(); // Prepara servidor

// Gera routes
server.createGetRoute() // gera route padrão;
server.createGetRoute('/home', (req, res) =>{
        
        res.render('home',
            {
                showHeader: true,
                showNav: true,
                
                title: saudacao('Teste'),
                windowAnchors: [
                    {name:'minha conta', route:'/', src:'/img/icons/usuario.png'},
                    {name:'minha agenda', route: '#', src:'/img/icons/calendario.png'},
                    {name:'Conversas', route: '#', src:'/img/icons/conversa.png'},
                    {name:'Configurações', route: '/configuracoes', src:'/img/icons/configuracao.png'}
                ],
                landscapeAnchors: [{name:'ajuda', route: '#', src:'/img/icons/ajuda.png'}]
            }
        )
    }); // Exibe home

server.createGetRoute('/negocios', (req, res) => {	
    
    res.render('detalhes', // Exibe tela business
        {
            showHeader: true,
            showNav: true,
            table: false,
            title: 'Negócios',
            windowAnchors: [
                {name:'contratos', route: '/contratos',  src:'/img/icons/contrato.png'},
                {name:'seleções', route: '/selecoes', src:'/img/icons/procurar.png'},
            ]
        })
});


server.createGetRoute('/contratos', (req, res) => {		
    res.render('detalhes', // Exibe tela de contratos
        {
            showHeader: true,
            showNav: true,
            table: true,
            title: 'Contratos',
            rows: [
                {key: 'Ativos', value:'0'},
                {key: 'Concluídos', value:'0'},
                {key: 'Cancelados', value:'0'},
                {key: 'Satisfação', value:'0.0'}
            ],
            windowAnchors: [
                {name:'novo contrato', route: '#', src:'/img/icons/adicionar.png'},
                {name:'gerenciamento', route: '#', src:'/img/icons/controle.png'},

            ],
            landscapeAnchors: [{name: 'histórico', route:'#', src:'/img/icons/historico.png'}]
        })
}); // Exibe business

server.createGetRoute('/selecoes', (req, res) => {
    res.render('detalhes',  // Exibe tela de seleções
        {
            showHeader: true,
            showNav: true,
            table: true,
            
            title: 'Seleções',
            rows: [
                {key: 'Ativos', value:'0'},
                {key: 'Concluídos', value:'0'},
                {key: 'Cancelados', value:'0'},
                {key: 'Total de inscritos', value:'0'}
            ],
            windowAnchors: [
                {name:'nova seleção', route: '#', src:'/img/icons/adicionar.png'},
                {name:'gerenciamento', route: '#', src:'/img/icons/controle.png'},

            ],
            landscapeAnchors: [{name: 'histórico', route:'#', src:'/img/icons/historico.png'}]
        })
}); // Exibe business

server.createGetRoute('/configuracoes', (req, res) => {

    res.render('tools',  // Exibe tela de configurações
        {
            showHeader: true,
            showNav: true,
            title: 'Configurações',
            windowAnchors: [
                {name:'métodos de pagamento', route: '#', src:'/img/icons/cartao-de-credito.png'},
                {name:'dados privados', route: '#', src:'/img/icons/privacidade.png'},
            ],
            showlandscapeAnchors: true,
            landscapeAnchors: [
                {name: 'idioma', route:'#', src:'/img/icons/idiomas.png'},
                {name: 'aparelhos conectados', route:'#', src:'/img/icons/pc.png'},
                {name: 'desconectar', route:'/loggedOut', src:'/img/icons/sair.png'},
            ]
        })
}); // Exibe business


server.createGetRoute('/u/:id', (req, res) => { // Exibe perfil do usuário
    res.render('perfil', 
        {
            showHeader: true,
            showNav: true,
            title:   "Meu perfil",
            name: "name",
            image: "/",
            rows: []
        }
    )}
);

server.createGetRoute('/login', (req, res) => {
    res.render('login', 
    {
        showHeader: false,
        showNav: false,
        unknownUser: false,
        unknownPwd: false
    })
});

// Inicia servidor
server.on();

