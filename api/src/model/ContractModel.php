<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\ContractsDB;
use App\Util\DataValidator;

/**
 * Classe modelo de contratos
 * 
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class ContractModel
{

    /**
     * ID do contrato
     * @var string
     */
    private string $id;

    /**
     * ID do contratante
     * @var string
     */
    private string $hirerID;

    /**
     * ID do contratado
     * @var string
     */
    private string $hiredID;

    /**
     * Valor do contrato
     * @var string
     */
    private string $price;

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

    /**
     * Avaliação do contrato
     * 
     */
    private int $rate;
    private bool $accepted;
    private bool $locked;

    /**
     * Objeto de validação de dados
     * @var DataValidator
     */
    private DataValidator $validator;

    function __construct()
    {
        $this->validator = new DataValidator(); 
    }
    
    /**
     * Obtém um modelo de contrato inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return ContractModel Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {
        $model = new ContractModel(
            $attr[ContractsDB::HIRER_ID],
            $attr[ContractsDB::HIRED_ID],
            intval($attr[ContractsDB::PRICE])
        );
        $model->id = $attr['id'];
        $model->date = $attr[ContractsDB::DATE];
        $model->time['inital'] = $attr[ContractsDB::INITAL_TIME];
        $model->time['final'] = $attr[ContractsDB::FINAL_TIME];
        $model->art = $attr[ContractsDB::ART];
        $model->locked = boolval($attr[ContractsDB::LOCKED]);
        $model->accepted = boolval($attr[ContractsDB::ACCEPTED]);
        return $model;
    }

    /**
     * Define ID do contrato
     * 
     * @param string $id ID do contrato
     */
    public function setID(string $id): void
    {
        $this->id = $id;
    }

    /**
     * Obtém ID do modelo
     * 
     * @return string ID
     */
    public function getID(): string
    {
        return $this->id;
    }

    /** 
     * @param string $hirerID ID do contratante
     */
    function setHirerID(string $hirerID)
    {
        $this->hirerID = $hirerID;           
    }

    /**
     * Obtém ID do contratante
     * 
     * @return string ID
     */
    public function gethirerID(): string
    {
        return $this->hirerID;
    }

    /** 
     * @param string $hiredID ID do contratado
     */
    function setHireDID(string $hiredID)
    {
        $this->hiredID = $hiredID;           
    }

    /**
     * Obtém ID do contratado
     * 
     * @return string ID
     */
    public function gethiredID(): string
    {
        return $this->hiredID;
    }

    /** 
     * @param string $price Valor do contrato
     */
    function setPrice(int $price)
    {
        $this->price = $price . ''; // Armazena valor como string            
    }

    /**
     * Obtém Valor do contrato
     * 
     * @return string Preço
     */
    public function getPrice(): string
    {
        return $this->price;
    }

    /**
     * Define aata do evento
     * 
     * @param string $date Data do evento
     */
    public function setDate(string $date): void
    {
        $this->date = $this->validator->isValidDateFormat($date) ? $date : null;
    }

    /**
     * Obtém data do evento
     */
    public function getDate(): string
    {
        return $this->date;
    }

    /**
     * Define Horários de início e fim do evento
     * 
     * @param string $inital Horário início
     * @param string $inital Horário fim
     */
    public function setTime(string $inital, string $final): void
    {
        $this->time = ['inital' => $this->validator->buildTime($inital), 'final' => $this->validator->buildTime($final)];
    }

    /**
     * Obtém horários do evento
     */
    public function getTime(): array
    {
        return $this->time;
    }

    /**
     * Define Tipo de arte do contrato
     * 
     * @param string $art Tipo de arte
     */
    public function setArt(string $art): void
    {
        $this->art = $art;
    }

    /**
     * Obtém tipo de arte
     */
    public function getArt(): string
    {
        return $this->art;
    }

    public function setRate(int $rate)
    {
        $this->rate = $this->validator->isRate($rate) ? $rate : null;
    }

    public function getRate(): int
    {
        return $this->rate;
    }

    public function setAccepted(bool $accepted): void
    {
        $this->accepted = $accepted;
    }

    public function isAccepted(): bool
    {
        return $this->accepted;
    }

    public function setLocked(bool $locked): void
    {
        $this->locked = $locked;
    }

    public function isLocked(): bool
    {
        return $this->locked;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id ?? null,
            'hirer' => $this->hirerID,
            'hired' => $this->hiredID,
            'price' => $this->price ?? null,
            'art' => $this->art ?? null,
            'date' => $this->date ?? null,
            'time' => $this->time ?? null,
            'locked' => $this->locked ?? null,
            'accepted' => $this->accepted ?? null,
        ];
    }
}