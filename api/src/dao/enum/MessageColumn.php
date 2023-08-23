<?php

namespace App\DAO\Enumerate;

enum MessageColumn
{

    public const SENDER = 'sender';
    public const CHAT = 'chat';
    public const CONTENT = 'content';
    public const DATETIME = 'shipping_datetime';

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
