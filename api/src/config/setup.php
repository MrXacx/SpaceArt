<?php

require_once __DIR__ . '/../../vendor/autoload.php'; // Carrega dependências

Locale::setDefault('pt-BR'); // Define charser

/**
 * Obtém as variáveis de ambiente para o banco de dados
 * @param bool $production true caso a execução seja para produção, false caso seja para desenvolvimento
 */
function getDatabaseSettings(bool $production = false): array{
    return parse_ini_file('setup.ini', true)[ $production ? 'DATABASE_PROUCTION' : 'DATABASE_DEVELOPMENT'];  
}

$_ENV = array_merge($_ENV, getDatabaseSettings());



?>
