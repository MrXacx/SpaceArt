<?php

header('Content-type: application/json; charset="utf-8"');

foreach(parse_ini_file(__DIR__.'/config/.ini', true)['DEVELOPMENT'] as $key => $value){
    $_ENV[$key] = $value;
}

echo json_encode([true]);
?>