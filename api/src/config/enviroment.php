<?php
    foreach(parse_ini_file(__DIR__.'/.ini', true)['DEVELOPMENT'] as $key => $value){
        $_ENV[$key] = $value;
    }
?>