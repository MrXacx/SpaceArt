<?php

namespace App\Util;

use App\DAO\AgreementDB;
use App\DAO\ApplicationDB;
use App\DAO\ArtistDB;
use App\DAO\ChatDB;
use App\DAO\EnterpriseDB;
use App\DAO\MessageDB;
use App\DAO\RateDB;
use App\DAO\ReportDB;
use App\DAO\SelectionDB;
use App\DAO\UsersDB;
use DateTime;


/**
 * Classe de validação de dados
 * 
 * @package Util
 * @author Ariel Santos (MrXacx)
 */
final class DataValidator
{
    //use \App\Util\Tool\DateTimeTrait; // Habilita ferramenta para datas e horários


    public function isUUID(string $uuid): bool
    {
        return preg_match('#^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$#', $uuid);
    }

    /**
     * Analisa se conteúdo da coluna de tipo varchar possui comprimento adequado
     * 
     * @param string $content Conteúdo de análise
     * @param string $column Nome da coluna
     * @return bool Retorna true se estiver entre o comprimento mínimo e máximo da coluna
     */
    public function isFit(string $content, string $column = ''): bool
    {
        $length = strlen($content);
        return  $length > 0 && $length <= match ($column) {
            ArtistDB::CPF, UsersDB::PHONE => 11,
            UsersDB::CEP => 8,
            UsersDB::FEDERATION => 2,
            UsersDB::CITY, EnterpriseDB::DISTRICT => 30,
            EnterpriseDB::CNPJ => 14,
            default => 191
        };
    }

    public function isValidToFlag(string $content, string $flag): bool
    {

        return match($flag){
            AgreementDB::HIRER, AgreementDB::HIRED, ChatDB::ARTIST, ChatDB::ENTERPRISE,
            SelectionDB::OWNER, ApplicationDB::ARTIST,
            ApplicationDB::SELECTION, MessageDB::CHAT, MessageDB::SENDER,
            ReportDB::REPORTER, ReportDB::REPORTED => $this->isUUID($content),

            AgreementDB::PRICE, SelectionDB::PRICE, UsersDB::RATE, RateDB::RATE => is_numeric($content),
            SelectionDB::INITAL_DATETIME, SelectionDB::FINAL_DATETIME, MessageDB::DATETIME => $this->isTimestamp($content),
            AgreementDB::INITAL_TIME, AgreementDB::FINAL_TIME => $this->isTime($content),
            AgreementDB::DATE => $this->isDate($content),
            
            UsersDB::SITE, UsersDB::IMAGE_URL => $this->isURL($content),
            UsersDB::EMAIL => $this->isEmail($content),

            UsersDB::CEP => $this->isCEP($content),
            ArtistDB::CPF => $this->isCPF($content),
            EnterpriseDB::CNPJ => $this->isCNPJ($content),
            default => $this->isFit($content, $flag)
        };
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
     * @param string $CEP Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isCEP(string $CEP): bool
    {
        return preg_match('#\b\d{8}\b#', $CEP); // 8 algarismos
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
     * Checa se valor está apto a ser inserido na coluna de cpf
     * 
     * @param string $documentNumber Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isCPF(string $CPF): bool
    {
        return preg_match('#^\d{11}$#', $CPF); // 11 algarismos
    }

    /**
     * Checa se valor está apto a ser inserido na coluna de cnpj
     * 
     * @param string $documentNumber Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isCNPJ(string $CNPJ): bool
    {
        return preg_match('#^\d{14}$#', $CNPJ); // 14 algarismos
    }

    /**
     * Checa se um email é válido
     * 
     * @param string $email Valor a ser analizado
     * @return bool Retorna true caso esteja
     */
    public function isEmail(string $email): bool
    {
        return preg_match('#^\\S+@\\S+\\.\\S+$#', $email); // 11 algarismos
    }

    public function isDate(string $date): bool
    {
        return DateTime::createFromFormat('Y-m-d', $date) instanceof DateTime;
    }

    public function isTime(string $time): bool
    {
        return DateTime::createFromFormat('H:i', $time) instanceof DateTime;
    }

    public function isTimestamp(string $timestamp): bool
    {
        return DateTime::createFromFormat('Y-m-d H:i:s', $timestamp) instanceof DateTime;
    }
}

