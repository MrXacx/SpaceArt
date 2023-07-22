<?php

namespace App\Tools;

use App\Utils\ContractDB;
use App\Utils\SelectionDB;
use App\Utils\UserDB;
use RuntimeException;

final class DataValidator{
    use \App\Tools\Traits\DateTimeTools;

    /**
     * Valida o formato da data
     * 
     * @throws RuntimeException Caso a data utilize um formato diferente de nn/nn/nnnn
     */
    protected function isValidDateFormat(string $date): bool{      
        if(preg_match('#\d{2}\/\d{2}\/\d{4}#', $date)){
            $date = explode('/', $date);
            return $date[0] >= 1 && $date[0] <= $this->getLastDayOfMonth($date[1], $date[2]);
        }
        throw new RuntimeException('A data passada por parâmetro deve seguir o seguinte modelo: DD/MM/AAAA');     
    }

    /**
     * Valida o formato de horário
     * 
     * @throws RuntimeException Caso o horário utilize um formato diferente de nn:nn
     */
    protected function isValidTimeFormat(string $time): bool{      
        if(preg_match('#\d{2}:\d{2}#', $time)){
            $time = explode(':', $time);
            return ($time[0] >= 0 && $time[0] <= 23) && ($time[1] >= 0 && $time[0] <= 59);
        }
        
        throw new RuntimeException('O horário passado por parâmetro deve seguir o seguinte modelo: HH:MM');     
    }

    /**
     * Analisa se conteúdo da coluna de tipo varchar possui comprimento adequado
     * 
     * @param string $varchar Conteúdo de análise
     * @param string $column Nome da coluna
     * @return bool Retorna true se estiver entre o comprimento mínimo e máximo da coluna
     * @throws RuntimeException Caso coluna informada não for encontrada
     */
    public function validateVarcharLength(string $varchar, string $column): bool{
        $length = strlen($varchar);
        return  $length > 0 && $length <= match($column){
            UserDB::NAME, UserDB::EMAIL, UserDB::SITE, UserDB::PWD, ContractDB::DESCRIPTION, SelectionDB::DESCRIPTION => 255,        
            ContractDB::ART, SelectionDB::ART => 10,
            default => throw new RuntimeException('Coluna não encontrada')
        };
    }

   
}


?>

