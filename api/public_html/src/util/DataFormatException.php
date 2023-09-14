<?php
namespace App\Util;

use Exception;

class DataFormatException extends Exception
{
    const LENGTH = 0;
    const REGEX = 1;

    public static function throw(string $variable, int $code = self::REGEX): void
    {
        $message = 
            'O formato do seguinte dado não é aceito por esta API: '
                . strtolower($variable)
                . '\n'
                . PHP_EOL
                . match($code) {
                    self::LENGTH => 'Comprimento não condiz com o esperado',
                    self::REGEX => 'Expressão regular não condiz com o esperado',
                    default => 'Motivo desconhecido.'
                };
        
  
       throw new DataFormatException($message, $code);
    }
}

?>