<?php

include_once __DIR__.'/config/enviroment.php';
include_once __DIR__.'/../vendor/autoload.php';

header('Content-type: application/json; charset="utf-8"');

$_ENV = array_merge($_ENV, getDatabaseSettings());


echo json_encode([]);

?>