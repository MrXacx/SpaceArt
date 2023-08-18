<?php
namespace App\DAO\Enumerate;

enum AgreementColumn: string
{
    /**
     * Nome da coluna de contratante
     * @var string
     */
    case HIRER_ID = 'hirer';

    /**
     * Nome da coluna de contratado
     * @var string
     */
    public const HIRED_ID = 'hired';

    /**
     * Nome da coluna de valor de contrato
     * @var string
     */
    public const PRICE = 'price';

    /**
     * Nome da coluna de tipo de arte
     * @var string
     */
    public const ART = 'art';

    /**
     * Nome da coluna de data do evento
     * @var string
     */
    public const DATE = 'date';

    /**
     * Nome da coluna de horário de início
     * @var string
     */
    public const INITAL_TIME = 'inital_time';

    /**
     * Nome da coluna de horário de fim
     * @var string
     */
    public const FINAL_TIME = 'final_time';

    /**
     * Nome da coluna de status do contrato
     * @var string
     */
    public const STATUS = 'status';

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

?>