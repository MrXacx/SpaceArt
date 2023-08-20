<?php

namespace App\DAO\Enumerate;

enum UserColumn
{
    public const NAME = 'name';
    public const IMAGE = 'image';
    public const PASSWORD = 'password';
    public const PHONE = 'phone';
    public const EMAIL = 'email';
    public const CEP = 'CEP';
    public const FEDERATION = 'federation';
    public const CITY = 'city';
    public const SITE = 'website';


    /**
     * Confere se valor é idêntico ao nome de alguma coluna da tabela
     * 
     * @param string Nome da coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column): bool
    {
        return !is_bool(array_search($column, self::cases()));
    }
}
