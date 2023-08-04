<?php

//header('Content-type: application/json; charset="utf-8"');
include_once __DIR__.'/config/enviroment.php';

$_ENV = array_merge($_ENV, getDatabaseSettings());


//echo json_encode([1]);
?>