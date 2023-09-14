<?php
use App\Controller\Tool\Controller;
use App\Util\Cache;

require_once __DIR__ . '/../../config/setup.php';

App\RoutesBuilder::build();

$response = new Symfony\Component\HttpFoundation\Response; // Inicia objeto de resposta
$response->headers->set('Content-Type', 'application/json'); // Define o formato da resposta

$cache = new Cache(
    str_replace('/','@', \App\Server::getURI())
);

if($cache->isInvalid()){
    Controller::$cache = $cache;
    
    $routes = new App\RoutesBuilder; // Inicia rotas do servidor
    $routes->fetchResponse($response, $routes->dispatch()); // Obtém a resposta da rota   
   // $cache->create($response->getContent(), 1);
} else {

    $response->setContent(
        $cache->getContent()
    );
}
$response->send(); // Exibe resposta




?>