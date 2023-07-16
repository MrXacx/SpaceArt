<?php

declare(strict_types = 1);
namespace App\Tools;

/**
 * Classe de emissão de exceções esperadas
 * 
 * @package Tools
 * @author Ariel Santos (MrXacx)
 */
class ExpectedException extends \RuntimeException{

    private function __construct(string $message){
        parent::__construct($message);
    }

    /**
     * Emite exceção e mensagem formatada
     * 
     * @param string $message Mensagem da exceção
     * @param string $file Arquivo em que a exceção foi solicitada
     * @param string $function Método em que a exceção foi solicitada
     * @param int $line Linha em que a exceção foi solicitada
     * @return void
     * @throws RuntimeException Mensage emitida com sucesso
     */
    public static function echo(string $message, string $file = 'Não informado', string $function = 'Não informado', int $line = null): void{
        echo <<<ERROR

            === EXCEÇÃO LANÇADA ===
                Mensagem: $message          
                Arquivo: $file
                Método: $function
                Linha: $line
            === FIM ===

        ERROR;
        
        throw new ExpectedException($message);
    }

}

?>