<?php

function getDatabaseSettings(bool $production = false): array{
    return parse_ini_file('.ini', true)[ $production ? 'DATABASE_PRODUCTION' : 'DATABASE_DEVELOPMENT'];  
}

$_ENV = array_merge($_ENV, getDatabaseSettings());
?>