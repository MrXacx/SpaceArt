<?php

require_once __DIR__ . '/config/setup.php';

$routes = new App\RoutesBuilder();
//$routes->fetchResponse($response, $routes->dispatch());

$response->setContent(json_encode($_SERVER));

$response->send();
