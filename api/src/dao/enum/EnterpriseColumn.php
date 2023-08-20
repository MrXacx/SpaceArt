<?php

namespace App\DAO\Enumerate;

enum EnterpriseColumn
{


    public const CNPJ = 'CNPJ';
    public const DISTRICT = 'district';
    public const ADDRESS = 'address';

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
