<?php

require_once __DIR__.'/../vendor/autoload.php'; // Carrega dependências

Locale::setDefault('pt-BR'); // Define charset

$_ENV = array_merge($_ENV, parse_ini_file('setup.ini', true));

$_ENV = array_merge($_ENV, $_ENV['DATABASE_DEVELOPMENT']) ;


?>
