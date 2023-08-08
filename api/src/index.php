<?php

use App\DAO\UsersDB;
use App\Models\UserModel;

include_once __DIR__.'/config/enviroment.php';
include_once __DIR__.'/../vendor/autoload.php';

$_ENV = array_merge($_ENV, getDatabaseSettings());

header('Content-type: application/json; charset="utf-8"');
echo json_encode([]);

?>