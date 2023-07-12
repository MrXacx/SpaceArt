<?php

declare(strict_types = 1);
namespace App\Models;

class ExceptionModel{
    function __construct(string $message, string $file = 'Não informado', string $function = 'Não informado'){
        $message = strtoupper($message);
        echo
            <<<ERROR

                === EXCEÇÃO LANÇADA ===
                    Mensagem: $message          
                    Arquivo: $file
                    Método: $function
                === FIM ===


            ERROR;
    }
}

?>