<?php

namespace App\Tools;

use RuntimeException;

final class DataValidater{
    use \App\Tools\Traits\DateTimeTools;

    /**
     * Valida o formato da data
     * 
     * @throws RuntimeException Caso a data utilize um formato diferente de nn/nn/nnnn
     */
    protected function validateDateFormat(string $date): bool{      
        if(preg_match('#\d{2}\/\d{2}\/\d{4}#', $date)){
            $date = explode('/', $date);
            return $date[0] >= 1 && $date[0] <= $this->getLastDayOfMonth($date[1], $date[2]);
        }
        throw new RuntimeException('A data passada por parâmetro deve seguir o seguinte modelo: DD/MM/AAAA');     
    }

    /**
     * Valida o formato de tempo
     * 
     * @throws RuntimeException Caso o tempo utilize um formato diferente de nn:nn
     */
    protected function validateTimeFormat(string $time): bool{      
        if(preg_match('#\d{2}:\d{2}#', $time)){
            $time = explode(':', $time);
            return ($time[0] >= 0 && $time[0] <= 23) && ($time[1] >= 0 && $time[0] <= 59);
        }
        
        throw new RuntimeException('O tempo passado por parâmetro deve seguir o seguinte modelo: HH:MM');     
    }
}


?>

