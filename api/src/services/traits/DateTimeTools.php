<?php

namespace App\Tools\Traits;

use DateTime;
use RuntimeException;

trait DateTimeTools{

    /**
     * Obtém o último dia do mês
     * 
     * @param int $month Número do mês
     * @param int $year Ano para análise
     * @return int Numeração do último dia do mês informadO
     * @throws RuntimeException Em caso de mês inexistente
     */
    private function getLastDayOfMonth(int $month, int $year): int{     
        return match($month){
            1,3,5,7,8,10,12 => 31,
            2,4,5,9,11 => 31,
            2 => $year%4 == 0 && ($year%100 != 0 || $year%400 == 0) ? 29 : 28, // Confere se ano é bissexto
            default => throw new RuntimeException("$month é um mês inválido.")   
        };
    }

    /**
     * Analisa se datetime refere-se a um momento do futuro
     * 
     * @param string $date Data para análise
     * @param string $now Horário para análise
     * @return bool Retorna true se corresponder a um horário futuro
     * @throws RuntimeException Em caso de mês fora do formato DD/MM/YYYY ou horário fora do formato HH:MM
     */
    public function isFuture(string $date, string $now): bool{     
        if($this->isValidDateFormat($date) && $this->isValidTimeFormat($now)){
        
            $formats = ['Y','m','d','H','i'];
            $values = array_combine($formats, $this->splitDateTime($date, $now));
            
            $now = new DateTime();
            foreach($values as $format => $value){
                $arr = array_slice($values, 0, array_search($format, $formats), true);
                if($value > $now->format($format) && $this->areCurrentTime($arr, $now)){ // Executa se o valor da posição atual for superior ao seu equivalente de horário e todos os anteriores forem idênticos aos seus equivalentes
                    return true;
                }
            }
            return false;
        }

        throw new RuntimeException("A data ou o horário não passou na validação");
    }

    /**
     * Transforma strings de data e horário em vetor
     * 
     * @param string $date Data
     * @param string $now Horário 
     * @return array Vetor contendo valores de data e horário na seguinte ordem: ano, mês, dia, hora e minuto;
     * @throws RuntimeException Em caso de mês fora do formato DD/MM/YYYY ou horário fora do formato HH:MM
     */
    private function splitDateTime(string $date, string $now): array{
        $values = [];
        foreach(array_reverse(explode('/', $date)) as $number){ // Itera data na ordem inversa
            $values[] = $number; // Insere ano, mês e dia no array
        }
        foreach(explode(':', $now) as $number){ // Itera horário
            $values[] = $number; // Insere hora e minuto no array
        }

        return $values;
    }

    /**
     * Analisa se todos os elementos do vetor são iguais aos seus equivalentes do horário atual
     * 
     * @param array $date Vetor associativo de dos elemento de datetime
     * @param DateTime $now manipulador de datetime 
     * @return bool Vetor contendo valores de data e horário na seguinte ordem: ano, mês, dia, hora e minuto;
     */
    private function areCurrentTime(array $list, DateTime $now): bool{
        if(!empty($list)){ // Executa se array tiver algum elemento
            foreach($list as $format => $value){ // Confere todos os índices
                if($value !== $now->format($format)){ // Executa se houver algum valor que não condiz com o horário atual
                    return false;
                }
            }
        }
        return true;
    }

    public function buildDatetime(string $date, string $time): string|null{
        try{
            return ($this->isValidDateFormat($date) && $this->isValidTimeFormat($time)) ? implode('-', array_reverse(explode('/', $date))) . " $time:00" : null;
        } catch(RuntimeException $ex){
            echo $ex->getMessage();
            return null;
        }
    }


    /**
     * Valida o formato da data
     * 
     * @param string $date Data a ser analizada
     * @return bool Retorna true se a data estiver no formato correto
     */
    abstract protected function isValidDateFormat(string $date): bool;

    /**
     * Valida o formato de horário
     * 
     * @param string $date Horário a ser analizada
     * @return bool Retorna true se O horário estiver no formato correto
     */
    abstract protected function isValidTimeFormat(string $time): bool;
}
?>