<?php

header('Content-Type: application/json');

require_once __DIR__ . '/config/setup.php';

$_ENV = array_merge($_ENV, getDatabaseSettings());


$routes = new \App\Controller\RoutesBuilder();
$routes->dispatch();


echo json_encode($routes->getResponse(), JSON_INVALID_UTF8_SUBSTITUTE);

?>

