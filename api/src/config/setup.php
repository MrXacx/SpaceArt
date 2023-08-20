<?php

require_once __DIR__ . '/../../vendor/autoload.php';

\Locale::setDefault('pt-BR');
\App\Controller\RoutesBuilder::createRoutes();

function getDatabaseSettings(bool $production = false): array{
    return parse_ini_file('.ini', true)[ $production ? 'DATABASE_PRODUCTION' : 'DATABASE_DEVELOPMENT'];  
}



?>