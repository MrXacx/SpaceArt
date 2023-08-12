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
class ContractModel extends \App\Model\Template\Entity
{

    /**
     * ID do contratante
     * @var string
     */
    private string|null $hirerID;

    /**
     * ID do contratado
     * @var string
     */
    private string|null $hiredID;

    /**
     * Valor do contrato
     * @var string
     */
    private string|null $price;

    /**
     * Tipo de arte
     * @var string
     */
    private string|null $art;

    /**
     * Data do evento
     * @var string
     */
    private string|null $date;

    /**
     * Horários de início e fim do evento
     * @var array
     */
    private array|null $time;

    /**
     * Avaliação do contrato
     * 
     */
    private int|null $rate;
    private bool|null $accepted;
    private bool|null $locked;

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
        $entity = new ContractModel();
        $entity->id = $attr['id'];
        $entity->hiredID = $attr[ContractsDB::HIRED_ID];
        $entity->hirerID = $attr[ContractsDB::HIRER_ID];
        $entity->price = intval($attr[ContractsDB::PRICE]);
        $entity->date = $attr[ContractsDB::DATE];



        $entity->time['inital'] = $attr[ContractsDB::INITAL_TIME] ?? null;
        $entity->time['final'] = $attr[ContractsDB::FINAL_TIME] ?? null;
        $entity->art = $attr[ContractsDB::ART] ?? null;

        if(isset($attr[ContractsDB::LOCKED]) && isset($attr[ContractsDB::ACCEPTED])){
            $entity->locked = boolval($attr[ContractsDB::LOCKED]);
            $entity->accepted = boolval($attr[ContractsDB::ACCEPTED]);
        }


        return $entity;
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
        return array_filter(array_merge(parent::toArray(), [
            'hirer' => $this->hirerID,
            'hired' => $this->hiredID,
            'price' => $this->price ?? null,
            'art' => $this->art ?? null,
            'date' => $this->date ?? null,
            'time' => $this->time ?? null,
            'locked' => $this->locked ?? null,
            'accepted' => $this->accepted ?? null,
        ]), fn($value) => isset($value));
    }
}
