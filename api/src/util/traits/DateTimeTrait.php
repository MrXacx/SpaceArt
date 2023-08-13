<?php

namespace App\Util\Tool;

use DateTime;
use RuntimeException;

/**
 * Ferramenta para manipulação de datetimes
 * 
 * @package Util\Tool
 * @author Ariel Santos (MrXacx)
 */
trait DateTimeTrait
{

    /**
     * Obtém o último dia do mês
     * 
     * @param int $month Número do mês
     * @param int $year Ano para análise
     * @return int Numeração do último dia do mês informadO
     * @throws RuntimeException Em caso de mês inexistente
     */
    private function getLastDayOfMonth(int $month, int $year): int
    {
        return match ($month) {
            1, 3, 5, 7, 8, 10, 12 => 31,
            2, 4, 5, 9, 11 => 31,
            2 => $year % 4 == 0 && ($year % 100 != 0 || $year % 400 == 0) ? 29 : 28, // Confere se ano é bissexto
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
    public function isFuture(string $date, string $now): bool
    {
        $formats = ['Y', 'm', 'd', 'H', 'i']; // Flags para a classe Datetime (Ano, mês, dia, hora e minuto)
        $values = array_combine($formats, $this->splitDateTime($date, $now)); // Define formatos como chaves dos pedaços do datetiem

        $now = new DateTime(); // Inicia manipulador de tempo

        foreach ($values as $format => $value) { // Itera datetime informado
            $arr = array_slice($values, 0, array_search($format, $formats), true); // Obtém todos os valores das posições anteriores
            if ($value > $now->format($format) && $this->areCurrentTime($arr, $now)) { // Executa se o valor da posição atual for superior ao seu equivalente de horário e todos os anteriores forem idênticos aos seus equivalentes
                return true;
            }
        }

        return false;
    }

    /**
     * Transforma strings de data e horário em vetor
     * 
     * @param string $date Data
     * @param string $now Horário 
     * @return array Vetor contendo valores de data e horário na seguinte ordem: ano, mês, dia, hora e minuto;
     * @throws RuntimeException Em caso de mês fora do formato YYYY-MM-DD ou horário fora do formato HH:MM
     */
    private function splitDateTime(string $date, string $now): array
    {
        $values = [];

        foreach (explode('-', $date) as $number) { // Itera data na ordem inversa
            $values[] = $number; // Insere ano, mês e dia no array
        }
        array_push($values, substr($now, 0, 2), substr($now, 4, 2)); // Insere hora e minuto no array

        return $values;
    }

    /**
     * Analisa se todos os elementos do vetor são iguais aos seus equivalentes ao horário atual
     * 
     * @param array $date Vetor associativo de dos elemento de datetime
     * @param DateTime $now manipulador de datetime 
     * @return bool Vetor contendo valores de data e horário na seguinte ordem: ano, mês, dia, hora e minuto;
     */
    private function areCurrentTime(array $list, DateTime $now): bool
    {
        if (!empty($list)) { // Executa se array tiver algum elemento
            foreach ($list as $format => $value) { // Confere todos os índices
                if ($value !== $now->format($format)) { // Executa se houver algum valor que não condiz com o horário atual
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Formata date e horário em datetime
     * 
     * @param string $date Data
     * @param string $time Horário
     * @return string|null Datetime no formato correto caso os valores informados sejam válidos, senão null
     */
    public function buildDatetime(string $date, string $time): string|null
    {
        $time = $this->buildTime($time);
        return $this->isValidDateFormat($date) && isset($time) ? "$date $time" : null;
    }

    /**
     * Formata horário para o modelo aceito no banco de dados
     * 
     * @param string $time Horário
     * @return string|null Horário formatado se o valor informado for válido, senão null
     */
    public function buildTime(string $time): string|null
    {
        return $this->isValidTimeFormat($time) ? "$time:00" : null;
    }
}
