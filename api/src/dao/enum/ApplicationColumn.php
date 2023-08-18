<?php
namespace App\DAO\Enumerate;

enum ApplicationColumn: string
{
    public const ARTIST = 'artist';
    public const SELECTION = 'selection';
    public const LAST_CHANGE = 'last_change';

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
