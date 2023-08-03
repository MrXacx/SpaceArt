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
     * Tipo de arte
     * @var string
     */
    private string $art;

    /**
     * Data do evento
     * @var string
     */
    private string $date;

    /**
     * Horários de início e fim do evento
     * @var array
     */
    private array $time;

    private int $rate;
    private bool $accepted;
    private bool $locked;

    /**
     * Objeto de validação de dados
     * @var DataValidator
     */
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
        $this->price = $price.''; // Armazena valor como string            
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
        $model->date = $attr[ContractDB::DATE];
        $model->setTime($attr[ContractDB::INITAL_TIME], $attr[ContractDB::FINAL_TIME]);
        $model->art = $attr[ContractDB::ART];
        
        return $model;
        
    }

    /**
     * Define ID do contrato
     * 
     * @param string $id ID do contrato
     */
    public function setID(string $id): void{
        $this->id = $id;
    }

    /**
     * Obtém ID do modelo
     * 
     * @return string ID
     */
    public function getID(): string{
        return $this->id;
    }

    /**
     * Obtém ID do contratante
     * 
     * @return string ID
     */
    public function gethirerID(): string{
        return $this->hirerID;
    }

    /**
     * Obtém ID do contratado
     * 
     * @return string ID
     */
    public function gethiredID(): string{
        return $this->hiredID;
    }

    /**
     * Obtém Valor do contrato
     * 
     * @return string Preço
     */
    public function getPrice(): string{
        return $this->price;
    }

    /**
     * Define aata do evento
     * 
     * @param string $date Data do evento
     */
    public function setDate(string $date): void{
        $this->date = $this->validator->isValidDateFormat($date) ? $date : null;
    }

    /**
     * Obtém data do evento
     */
    public function getDate(): string{
        return $this->date;
    }
    
    /**
     * Define Horários de início e fim do evento
     * 
     * @param string $inital Horário início
     * @param string $inital Horário fim
     */
    public function setTime(string $inital, string $final): void{
        $this->time = ['inital' => $this->validator->buildTime($inital), 'final' => $this->validator->buildTime($final)];
    }

    /**
     * Obtém horários do evento
     */
    public function getTime(): array{
        return $this->time;
    }

    /**
     * Define Tipo de arte do contrato
     * 
     * @param string $art Tipo de arte
     */
    public function setArt(string $art): void{
        $this->art = $art;
    }

    /**
     * Obtém tipo de arte
     */
    public function getArt(): string{
        return $this->art;
    }

    public function setRate(int $rate){
        $this->rate = $this->validator->isRate($rate) ? $rate : null;
    }

    public function getRate(): int{
        return $this->rate;
    }

    public function setAccepted(bool $accepted): void{
        $this->accepted = $accepted;
    }

    public function isAccepted(): bool{
        return $this->accepted;
    }
  
    public function setLocked(bool $locked): void{
        $this->locked = $locked;
    }

    public function isLocked(): bool{
        return $this->locked;
    }
  
}
?>