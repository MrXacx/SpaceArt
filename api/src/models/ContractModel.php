<?php

declare(strict_types = 1);
namespace App\Models;

use App\Utils\ContractDB;

/**
 * Classe modelo de contratos
 * 
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class ContractModel{
    /**
     * ID do contrato
     * @var string
     */
    public string $id;

    /**
     * Valor do contrato
     * @var string
     */
    public string $price;

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
     * @param string $price Valor do contrato
     * @param string $date Data do evento
     * @param array $interval Horários de início e fim respectivamente
     * @param string $art Tipo de arte a ser exercido
     * @param string $description Descrição do contrato
     */
    function __construct(string $hirerID, string $hiredID, string $price, string $date, array $interval, string $art, string $description){
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
     * Obtém um modelo de contrato inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return ContractModel Instância da classe
     */
    public static function get(array $attr): self{
        $model = new ContractModel(
            $attr[ContractDB::HIRER_ID],
            $attr[ContractDB::HIRED_ID],
            $attr[ContractDB::PRICE],
            $attr[ContractDB::DATE], 
            [substr($attr[ContractDB::INITAL_TIME], 0, 5), substr($attr[ContractDB::FINAL_TIME], 0, 5)],
            $attr[ContractDB::ART],
            $attr[ContractDB::DESCRIPTION]
        );
        $model->id = $attr['id'];
        return $model;
        
    }
}

?>