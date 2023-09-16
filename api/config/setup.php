<?php

ini_set('display_errors', 0);

require_once __DIR__.'/../vendor/autoload.php'; // Carrega dependências

use App\Server;
use App\Util\Log;
use Monolog\Logger;
use Monolog\Level;

Locale::setDefault('pt-BR'); // Define charset

$_ENV = array_merge($_ENV, parse_ini_file('setup.ini', true));
$_ENV = array_merge($_ENV, $_ENV['DATABASE_DEVELOPMENT']) ;

Server::$logger = new Log(
    new Logger('SpaceartAPI'),
    Level::Debug
);

App\RoutesBuilder::build(); // Inicia rotas do servidor

?>
