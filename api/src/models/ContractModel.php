<?php

declare(strict_types = 1);
namespace App\Models;

require_once __DIR__.'/../vendor/autoload.php';
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
     * Obtém um modelo de contrato inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return ContractModel Instância da classe
     */
    public static function get(array $attr): self{
        return new ContractModel(
            $attr[ContractDB::HIRER_ID],
            $attr[ContractDB::HIRED_ID],
            $attr[ContractDB::PRICE],
            $attr[ContractDB::DATE], 
            [$attr[ContractDB::INITAL_TIME], ContractDB::FINAL_TIME],
            $attr[ContractDB::ART],
            $attr[ContractDB::DESCRIPTION]
        );
    }
}

?>