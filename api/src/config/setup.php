<?php

require_once __DIR__ . '/../../vendor/autoload.php';

Locale::setDefault('pt-BR');
App\RoutesBuilder::createRoutes();

function getDatabaseSettings(bool $production = false): array{
    return parse_ini_file('setup.ini', true)[ $production ? 'DATABASE_PROUCTION' : 'DATABASE_DEVELOPMENT'];  
}

$_ENV = array_merge($_ENV, getDatabaseSettings(true));



?>