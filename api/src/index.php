<?php

require_once __DIR__ . '/config/setup.php';

$response = new Symfony\Component\HttpFoundation\Response(); // Inicia objeto de resposta
$response->headers->set('Content-Type', 'application/json'); // Define o formato da resposta

$routes->fetchResponse($response, $routes->dispatch()); // Obtém a resposta da rota

$response->send(); // Exibe resposta

?>
