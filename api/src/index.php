<?php

use App\DAO\UsersDB;
use App\Model\User;

header('Content-Type: application/json');

require_once __DIR__ . '/config/setup.php';

$routes = new App\RoutesBuilder();
$routes->dispatch();


echo json_encode($routes->getResponse(), JSON_INVALID_UTF8_SUBSTITUTE);
