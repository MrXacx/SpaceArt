<?php

declare(strict_types = 1);
namespace App\Models;

/**
 * Classe modelo de contratos
 * 
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class ContractModel{
    /**
     * Nome da coluna de contratante
     * @var string
     */
    public const HIRER_ID = 'hirer';

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
     * Nome da coluna de descrição do contrato
     * @var string
     */
    public const DESCRIPTION = 'contract_description';

    /**
     * Nome da coluna de data do evento
     * @var string
     */
    public const DATE = 'date_point';

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
     * ID do contrato
     * @var string
     */
    public string $id;

    /**
     * Valor do contrato
     * @var string
     */
    public float $price;

    /**
     * Detalhes do contrato
     * @var array
     */
    private array $details;

    /**
     * ID do contratante
     * @var string
     */
    public string $hirerID;

    /**
     * ID do contratado
     * @var string
     */
    public string $hiredID;

    /** 
     * @param string $hirerID ID do contratante
     * @param string $hiredID ID do contratado
     * @param float $price Valor do contrato
     * @param string $date Data do evento
     * @param array $interval Horários de início e fim respectivamente
     * @param string $art Tipo de arte a ser exercido
     * @param string $description Descrição do contrato
     */
    function __construct(string $hirerID, string $hiredID, float $price, string $date, array $interval, string $art, string $description){
        $this->hirerID = $hirerID;
        $this->hiredID = $hiredID;
        $this->price = $price;
        $this->details['date'] = $date;
        $this->details['time']['inital'] = $interval[0];
        $this->details['time']['final'] = $interval[1];
        $this->details['art'] = $art;            
        $this->details['description'] = $description;    
    }

    /**
     * Obtém array com detalhes do contrato
     * 
     * @return array Detalhes do contrato
     */
    public function getDetails(): array{
        return $this->details;
    }
    
    /**
     * Confere se string é compatível com alguma coluna da tabela
     * 
     * @param string Coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column):bool{
        $columns = [self::HIRER_ID, self::HIRED_ID, self::PRICE, self::ART, self::DESCRIPTION, self::DATE, self::INITAL_TIME, self::FINAL_TIME];
        return !is_bool(array_search($column,$columns));
    }

    /**
     * Obtém um modelo de contrato inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return ContractModel Instância da classe
     */
    public static function get(array $attr): self{
        return new ContractModel(
            $attr[static::HIRER_ID],
            $attr[static::HIRED_ID],
            $attr[static::PRICE],
            $attr[static::DATE], 
            [$attr[static::INITAL_TIME], static::FINAL_TIME],
            $attr[static::ART],
            $attr[static::DESCRIPTION]
        );
    }
}

?>