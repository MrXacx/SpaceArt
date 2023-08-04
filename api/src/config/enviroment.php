<?php

function getDatabaseSettings(bool $production = false): array{
    return parse_ini_file('enviroment.ini', true)[ $production ? 'DATABASE_PRODUCTION' : 'DATABASE_DEVELOPMENT'];  
}

?>