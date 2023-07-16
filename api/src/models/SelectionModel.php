<?php

declare(strict_types = 1);
namespace App\Models;
require_once __DIR__.'/../../vendor/autoload.php';

/**
 * Classe modelo de seleção
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class SelectionModel{   
    /**
     * Nome da coluna do ID do criador da seleção
     * @var string
     */
    public const OWNER_ID = 'owner_id';
    
    /**
     * Nome da coluna do valor
     * @var string
     */
    public const PRICE = 'price';
    
    /**
     * Nome da coluna do tipo de arte
     * @var string
     */
    public const ART = 'art';
    
    /**
     * Nome da coluna descrição da seleção
     * @var string
     */
    public const DESCRIPTION = 'selection_description';
    
    /**
     * Nome da coluna da data de início da seleção
     * @var string
     */
    public const INITAL_DATE = 'inital_date';
    
    /**
     * Nome da coluna da data de fim da seleção
     * @var string
     */
    public const FINAL_DATE = 'final_date';
    
    /**
     * Nome da coluna do horário de início da seleção
     * @var string
     */
    public const INITAL_TIME = 'inital_time';
    
    /**
     * Nome da coluna do horário de fim da seleção
     * @var string
     */
    public const FINAL_TIME = 'final_time';

    /**
     * ID da seleção
     * @var string
     */
    public string $id;
    
    /**
     * Valor da seleção
     * @var float
     */
    public float $price;
    
    /**
     * Detalhes da seleção
     * @var array
     */
    private array $details;
    
    /**
     * ID do criador da seleção
     * @var string
     */
    public string $ownerID;

    /**
     * @param string $ownerID ID do criador da seleção
     * @param float $price Valor da seleção
     * @param array $date Data de início e fim da seleção
     * @param array $interval Horário de início e fim da seleção
     * @param string $art Arte buscada na seleção
     * @param string $description Descrição da seleção
     */
    function __construct(string $ownerID, float $price, array $date, array $interval, string $art, string $description){
        $this->ownerID = $ownerID;
        $this->price = $price;
        $this->details['date']['inital'] = $date[0];
        $this->details['date']['final'] = $date[1];
        $this->details['time']['inital'] = $interval[0];
        $this->details['time']['final'] = $interval[1];
        $this->details['art'] = $art;            
        $this->details['description'] = $description;    
    }

    /**
     * Obtém array com detalhes da seleção
     * 
     * @return array Detalhes da seleção
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
        $columns = [self::OWNER_ID, self::PRICE, self::ART, self::DESCRIPTION, self::INITAL_DATE, self::INITAL_DATE, self::INITAL_TIME, self::FINAL_TIME];
        return !is_bool(array_search($column,$columns));
    }

    /**
     * Obtém um modelo de seleção inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function get(array $attr): self{
        return new SelectionModel(
            $attr[static::OWNER_ID],
            $attr[static::PRICE],
            [$attr[static::INITAL_DATE], static::FINAL_DATE],
            [$attr[static::INITAL_TIME], static::FINAL_TIME],
            $attr[static::ART],
            $attr[static::DESCRIPTION]
        );
    }
}

?>