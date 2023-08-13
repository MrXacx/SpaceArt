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
class Contract extends \App\Model\Template\Entity
{

    use \App\Util\Tool\DateTimeTrait;

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
     * Obtém um modelo de contrato inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return Contract Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {
        $entity = new Contract();
        foreach ($attr as $key => $value) {
            switch ($key) {
                case 'id':
                    $entity->id = $value;
                    break;
                case ContractsDB::HIRED_ID:
                    $entity->hiredID = $value;
                    break;
                case ContractsDB::HIRER_ID:
                    $entity->hirerID = $value;
                    break;
                case ContractsDB::PRICE:
                    $entity->price = intval($value);
                    break;
                case ContractsDB::DATE:
                    $entity->date = $value;
                    break;
                case ContractsDB::INITAL_TIME:
                    $entity->time['inital'] = $value;
                    break;
                case ContractsDB::FINAL_TIME:
                    $entity->time['final'] = $value;
                    break;
                case ContractsDB::ART:
                    $entity->art = $value;
                    break;
                case ContractsDB::LOCKED:
                    $entity->locked = boolval($value);
                    break;
                case ContractsDB::ACCEPTED:
                    $entity->accepted = boolval($value);
                    break;
            }
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
        $this->date = $date;
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
     * @param string $inital Horário de início
     * @param string $final Horário de fim
     */
    public function setTime(string $inital, string $final): void
    {
        $this->time = ['inital' => $this->buildTime($inital), 'final' => $this->buildTime($final)];
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
        $this->rate =  $rate;
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
            'price' => $this->price,
            'date' => $this->date,
            'art' => $this->art ?? null,
            'time' => $this->time ?? null,
            'locked' => $this->locked ?? null,
            'accepted' => $this->accepted ?? null,
        ]), fn ($value) => isset($value));
    }
}
