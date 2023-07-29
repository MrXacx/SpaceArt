<?php

namespace App\Utils;

use App\DAO\ContractDB;
use App\DAO\SelectionDB;
use App\DAO\UserDB;
use RuntimeException;

final class DataValidator{
    use \App\Utils\Tools\DateTimeTrait;

    /**
     * Valida o formato da data
     */
    public function isValidDateFormat(string $date): bool{      
        if(preg_match('#\d{4}-\d{2}-\d{2}#', $date)){
            $date = explode('-', $date);
            return $date[2] >= 1 && $date[2] <= $this->getLastDayOfMonth($date[1], $date[0]);
        }
        
        return false;     
    }

    /**
     * Valida o formato de horário
     */
    public function isValidTimeFormat(string $time): bool{

        if(preg_match('#\d{2}:\d{2}#', $time)){
            $time = explode(':', $time);
            return ($time[0] >= 0 && $time[0] <= 23) && ($time[1] >= 0 && $time[0] <= 59);
        }

        return false;    
    }

    /**
     * Analisa se conteúdo da coluna de tipo varchar possui comprimento adequado
     * 
     * @param string $varchar Conteúdo de análise
     * @param string $column Nome da coluna
     * @return bool Retorna true se estiver entre o comprimento mínimo e máximo da coluna
     * @throws RuntimeException Caso coluna informada não for encontrada
     */
    public function isValidVarcharLength(string $varchar, string $column): bool{
        $length = strlen($varchar);
        return  $length > 0 && $length <= match($column){
            'id' => 36,
            UserDB::NAME, UserDB::EMAIL, UserDB::SITE, UserDB::PWD, ContractDB::ART, SelectionDB::ART => 255,
            default => throw new RuntimeException('Coluna não encontrada')
        };
    }

    public function isPrice(string $price): bool{
        return intval($price) == $price && strlen($price) <= 5;
    }

    public function isPhone(string $phone): bool{
        return preg_match('#[1-9]\d9(8|9)\d{7}#', $phone);
    }

    public function isCEP(string $cep): bool{
        return preg_match('#\b\d{8}\b#', $cep);
    }

    public function isURL(string $url): bool{
        return preg_match('#^https{0,1}://[\w\.-]+/(([\w\.-_]+)/)*(\?([\w_-]+=[\w%-]+&{0,1})+){0,1}$#', $url);
    }

    public function isDocumentNumber(string $documentNumber): bool{
        return preg_match('#^\d{11}$#', $documentNumber);
    }

    public function isValidDatetimeFormat(string $datetime): bool{
        $datetime = explode(" ", $datetime);
        return $this->isValidDateFormat($datetime[0]) && $this->isValidTimeFormat($datetime[1]);
    }

    public function isValidToFlag(string $flag, string $value): bool{
        return match($flag){
            ContractDB::DATE => $this->isValidDateFormat($value),
            ContractDB::INITAL_TIME, ContractDB::FINAL_TIME => $this->isValidTimeFormat($value),
            SelectionDB::INITAL_DATETIME, SelectionDB::FINAL_DATETIME => $this->isValidDatetimeFormat($value),
            UserDB::PHONE => $this->isPhone($value),
            UserDB::DOCUMENT_NUMBER => $this->isDocumentNumber($value),
            UserDB::CEP => $this->isCEP($value),
            UserDB::SITE => $this->isURL($value),
            default => $this->isValidVarcharLength($value, $flag)
        };
    }
   
}

?>

