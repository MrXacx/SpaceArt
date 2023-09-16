<?php

$startTime = microtime(true);

use App\Controller\Tool\Controller;
use App\Util\Cache;
use App\Server;
use Monolog\Level;

require_once __DIR__ . '/../../config/setup.php';

Server::$logger->build(); // Cria log para o dia

// Armazena endereço do client
Server::$logger->push('requisição feita por ' . Server::getClientIP(), Level::Info);

$response = new Symfony\Component\HttpFoundation\Response; // Inicia objeto de resposta
$response->headers->set('Content-Type', 'application/json'); // Define o formato da resposta

Controller::$cache = new Cache(
    // Inicializa manipulação de cache
    str_replace('/', '@', Server::getURI())
);

try {
    if (!Controller::$cache->isUsable()) { // Executa se o cache não existir ou estiver expirado

        Server::$logger->push('rotina de consulta ao banco de dados remoto inicializada', Level::Notice); // Informa consulta ao banco de dados
        $routes = new App\RoutesBuilder;
        $routes->fetchResponse($response, $routes->dispatch()); // Obtém a resposta da rota

    } else {
        Server::$logger->push('rotina de consulta ao cache inicializada', Level::Notice);
        $response->setContent(
            Controller::$cache->getContent()
        );
    }
    
} catch (Exception $ex) {
    Server::$logger->push('exceção lançada: ' . $ex->getMessage(), Level::Critical); 
}

$response->send(); // Exibe resposta

$time = microtime(true) - $startTime;

Server::$logger->push('resposta enviada para ' . Server::getClientIP(), Level::Info);
Server::$logger->push('tempo de resposta: ' . $time . 'ms', Level::Debug);

?>