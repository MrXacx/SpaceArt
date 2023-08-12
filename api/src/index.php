<?php

header('Content-Type: application/json');

include_once __DIR__ . '/config/enviroment.php';
require_once __DIR__ . '/../vendor/autoload.php';

$_ENV = array_merge($_ENV, getDatabaseSettings());

use App\Controller\RoutesBuilder;

if(!RoutesBuilder::isBuilded()){
    RoutesBuilder::createRoutes();
}

$routes = new RoutesBuilder();
$routes->dispatch();

echo json_encode($routes->getResponse());

?>