<?php

declare(strict_types = 1);
namespace App\Models;

use App\Utils\SelectionDB;

/**
 * Classe modelo de seleção
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class SelectionModel{
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
     * Obtém um modelo de seleção inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function get(array $attr): self{
        return new SelectionModel(
            $attr[SelectionDB::OWNER_ID],
            $attr[SelectionDB::PRICE],
            [$attr[SelectionDB::INITAL_DATE], SelectionDB::FINAL_DATE],
            [$attr[SelectionDB::INITAL_TIME], SelectionDB::FINAL_TIME],
            $attr[SelectionDB::ART],
            $attr[SelectionDB::DESCRIPTION]
        );
    }
}

?>