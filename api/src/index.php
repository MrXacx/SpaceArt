<?php

declare(strict_types = 1);

foreach(parse_ini_file(__DIR__.'/config/.ini', true)['DEVELOPMENT'] as $key => $value){
    $_ENV[$key] = $value;
}

?>