<?php

namespace App\DAO\Enumerate;

enum SelectionColumn
{
    /**
     * Nome da coluna do ID do criador da seleção
     * @var string
     */
    public const OWNER_ID = 'owner';

    /**
     * Nome da coluna do preço
     * @var string
     */
    public const PRICE = 'price';

    /**
     * Nome da coluna do tipo de arte
     * @var string
     */
    public const ART = 'art';

    /**
     * Nome da coluna da data de início da seleção
     * @var string
     */
    public const INITAL_DATETIME = 'inital_datetime';

    /**
     * Nome da coluna da data de fim da seleção
     * @var string
     */
    public const FINAL_DATETIME = 'final_datetime';

    /**
     * Nome da coluna de status
     * @var bool
     */
    public const LOCKED = 'locked';


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
