<?php

declare(strict_types = 1);
namespace App\Models;

use App\DAO\ContractDB;
use App\Utils\DataValidator;

/**
 * Classe modelo de contratos
 * 
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class ContractModel{

    // TODO: adicionar coluna de status(enum, se possível) e avaliação(int)

    /**
     * ID do contrato
     * @var string
     */
    public string $id;

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
     * Valor do contrato
     * @var string
     */
    public string $price;

    /**
     * Detalhes do contrato
     * @var array
     */
    private array $details;

    private DataValidator $validator;

    /** 
     * @param string $hirerID ID do contratante
     * @param string $hiredID ID do contratado
     * @param string $price Valor do contrato
     */
    function __construct(string $hirerID, string $hiredID, int $price){
        $this->validator = new DataValidator();
        $this->hirerID = $hirerID;
        $this->hiredID = $hiredID;
        $this->price = $price.'';             
    }

    public function setID(string $id): void{
        $this->id = $id;
    }

    public function setArt(string $art): void{
        $this->details['art'] = $art;
    }

    public function setDate(string $date): void{
        $this->details['date'] = $this->validator->buildDate($date);
    }

    public function setTime(string $inital, string $final): void{
        $this->details['time']['inital'] = $this->validator->buildTime($inital);
        $this->details['time']['final'] = $this->validator->buildTime($final);
    }


    public function getID(): string{
        return $this->id;
    }

    public function gethirerID(): string{
        return $this->hirerID;
    }

    public function gethiredID(): string{
        return $this->hiredID;
    }
 
    public function getPrice(): string{
        return $this->price;
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
    public static function getInstaceOf(array $attr): self{
        $model = new ContractModel(
            $attr[ContractDB::HIRER_ID],
            $attr[ContractDB::HIRED_ID],
            intval($attr[ContractDB::PRICE])
        );
        $model->id = $attr['id'];
        $model->details = [
            'date' => $attr[ContractDB::DATE],
            'time' => [
                'inital' => $attr[ContractDB::INITAL_TIME],
                'final' => $attr[ContractDB::FINAL_TIME]
            ],
            ContractDB::ART => $attr[ContractDB::ART]
        ];
        
        return $model;
        
    }
}

?>