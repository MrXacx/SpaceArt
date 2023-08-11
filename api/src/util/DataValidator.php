<?php

namespace App\Util;

use App\DAO\ContractsDB;
use App\DAO\SelectionsDB;
use App\DAO\UsersDB;
use RuntimeException;


/**
 * Classe de validação de dados
 * 
 * @package Util
 * @author Ariel Santos (MrXacx)
 */
final class DataValidator
{
    use \App\Util\Tool\DateTimeTrait; // Habilita ferramenta para datas e horários

    /**
     * Valida o formato de uma data
     * 
     * @param string $date Data a ser analizada
     * @return bool Retorna true se estiver no formato correto
     */
    public function isValidDateFormat(string $date): bool
    {
        if (preg_match('#^\d{4}-\d{2}-\d{2}$#', $date)) { // Executa se o formato AAAA-MM-DD for respeitado
            $date = explode('-', $date); // Separa string em vetor
            return $date[2] >= 1 && $date[2] <= $this->getLastDayOfMonth($date[1], $date[0]); // Garante que os valores de mês e dia condizem com a realidade
        }

        return false;
    }

    /**
     * Valida o formato de um horário
     * 
     * @param string $date Horário a ser analizado
     * @return bool Retorna true se estiver no formato correto
     */
    public function isValidTimeFormat(string $time): bool
    {

        if (preg_match('#^\d{2}:\d{2}(:\d{2}){0,1}$#', $time)) { // Executa se estiver no formato por HH:MM ou HH:MM:SS
            $time = explode(':', $time); // Separa string em vetor
            return ($time[0] >= 0 && $time[0] <= 23) && ($time[1] >= 0 && $time[0] <= 59); // Retorna com base nos valores de hora e minuto
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
    public function isValidVarcharLength(string $varchar, string $column): bool
    {
        $length = strlen($varchar);
        return  $length > 0 && $length <= match ($column) {
            'id' => 36,
            UsersDB::NAME, UsersDB::EMAIL, UsersDB::SITE, UsersDB::PWD, ContractsDB::ART, SelectionsDB::ART => 255,
            default => throw new RuntimeException('Coluna não encontrada')
        };
    }

    /**
     * Checa se valor está apto a ser inserido na coluna de preço
     * 
     * @param string $price Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isPrice(string $price): bool
    {
        return preg_match('#^\d{1,5}$#', $price); // Inteiro e com até 5 caracteres
    }

    /**
     * Checa se valor está apto a ser inserido na coluna de número de telefone
     * 
     * @param string $phone Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isPhone(string $phone): bool
    {
        return preg_match('#[1-9]\d9(8|9)\d{7}#', $phone); // Espaço para DDD e demais 9 números
    }

    /**
     * Checa se valor está apto a ser inserido na coluna de cep
     * 
     * @param string $cep Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isCEP(string $cep): bool
    {
        return preg_match('#\b\d{8}\b#', $cep); // 8 algarismos
    }

    /**
     * Checa se valor está apto a ser inserido na coluna de website
     * 
     * @param string $url Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isURL(string $url): bool
    {
        // Suporte a método http/https, domínio, path e query string
        return preg_match('#^https{0,1}://[\w\.-]+/(([\w\.-_]+)/)*(\?([\w_-]+=[\w%-]+&{0,1})+){0,1}$#', $url);
    }

    /**
     * Checa se valor está apto a ser inserido na coluna de cpf/cnpj
     * 
     * @param string $documentNumber Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isDocumentNumber(string $documentNumber): bool
    {
        return preg_match('#^\d{11}$#', $documentNumber); // 11 algarismos
    }

    /**
     * Checa se um email é válido
     * 
     * @param string $email Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isEmail(string $email): bool
    {
        return preg_match('#^/\S+@\S+\.\S+/$#', $email); // 11 algarismos
    }

    /**
     * Checa se valor está apto a ser inserido em colunas do tipo datetime
     * 
     * @param string $url Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isValidDatetimeFormat(string $datetime): bool
    {
        $datetime = explode(" ", $datetime);
        return $this->isValidDateFormat($datetime[0]) && $this->isValidTimeFormat($datetime[1]);
    }

    public function isRate(int $rate): bool
    {
        return $rate >= 0 && $rate <= 5;
    }

    /**
     * Checa se valor está apto a ser inserido na tabela
     * 
     * @param string $flag Coluna de destino
     * @param string $value Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isValidToFlag(string $flag, string $value): bool
    {
        return match ($flag) {
            ContractsDB::DATE => $this->isValidDateFormat($value),
            ContractsDB::INITAL_TIME, ContractsDB::FINAL_TIME => $this->isValidTimeFormat($value),
            SelectionsDB::INITAL_DATETIME, SelectionsDB::FINAL_DATETIME => $this->isValidDatetimeFormat($value),
            UsersDB::PHONE => $this->isPhone($value),
            UsersDB::DOCUMENT_NUMBER => $this->isDocumentNumber($value),
            UsersDB::CEP => $this->isCEP($value),
            UsersDB::SITE => $this->isURL($value),
            default => $this->isValidVarcharLength($value, $flag)
        };
    }
}
