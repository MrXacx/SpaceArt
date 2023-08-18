<?php

namespace App\DAO\Enumerate;

enum ReportColumn: string
{
    public const REPORTER = 'reporter';
    public const REPORTED = 'reported';
    public const REASON = 'selection';
    public const ACCEPTED = 'last_change';


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
