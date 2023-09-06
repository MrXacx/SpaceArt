<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\AgreementDB;
use App\Model\Enumerate\AgreementStatus;
use App\Model\Enumerate\ArtType;
use App\Util\DataFormatException;
use DateTime;

/**
 * Classe modelo de contrato
 * 
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class Agreement extends \App\Model\Template\Entity
{

    use \App\Util\Tool\DateTimeTrait;

    /**
     * ID do contratante
     * @var string
     */
    private string $hirer;

    /**
     * ID do contratado
     * @var string
     */
    private string $hired;

    /**
     * Valor do contrato
     * @var float|string
     */
    private float|string $price;

    /**
     * Tipo de arte
     * @var ArtType
     */
    private ArtType $art;

    /**
     * Data do evento
     * @var DateTime
     */
    private DateTime $date;

    /**
     * Horários de início e fim do evento
     * @var array<DateTime>
     */
    private array $time;

    /**
     * Status do contrato
     * @var AgreementStatus
     */
    private AgreementStatus $status;


    public static function getInstanceOf(array $attr): self
    {
        $entity = new Agreement;
        foreach ($attr as $key => $value) {
            switch ($key) {
                case 'id':
                    $entity->id = $value;
                    break;
                case AgreementDB::HIRED:
                    $entity->hired = $value;
                    break;
                case AgreementDB::HIRER:
                    $entity->hirer = $value;
                    break;
                case AgreementDB::PRICE:
                    $entity->price = $value;
                    break;
                case AgreementDB::DATE:
                    $entity->date = DateTime::createFromFormat(AgreementDB::DB_DATE_FORMAT, $value);
                    break;
                case AgreementDB::INITAL_TIME:
                    $entity->time['inital'] = DateTime::createFromFormat(AgreementDB::DB_TIME_FORMAT, $value);
                    break;
                case AgreementDB::FINAL_TIME:
                    $entity->time['final'] = DateTime::createFromFormat(AgreementDB::DB_TIME_FORMAT, $value);
                    break;
                case AgreementDB::ART:
                    $entity->art = ArtType::tryFrom($value);
                    break;
                case AgreementDB::STATUS:
                    $entity->status = AgreementStatus::tryFrom($value);
                    break;
            }
        }

        return $entity;
    }

    /** 
     * Define o ID do contratante
     * @param string $hirer ID do contratante
     */
    function setHirer(string $hirer)
    {
        $this->hirer = $this->validator->isUUID($hirer) ? $hirer : throw new DataFormatException('hirer id');
    }

    /**
     * Obtém ID do contratante
     * @return string
     */
    public function getHirer(): string
    {
        return $this->hirer;
    }

    /** 
     * Define ID do contratado
     * @param string
     */
    function setHired(string $hired)
    {
        $this->hired = $this->validator->isUUID($hired) ? $hired : throw new DataFormatException('hired id');
    }

    /**
     * Obtém ID do contratado
     * @return string
     */
    public function gethired(): string
    {
        return $this->hired;
    }

    /** 
     * Define preço do contrato
     * @param float
     */
    function setPrice(float $price)
    {
        $this->price = $price;
    }

    /**
     * Obtém Valor do contrato
     * @return float
     */
    public function getPrice(): float
    {
        return floatval($this->price);
    }

    /**
     * Define aata do evento
     * @param DateTime
     */
    public function setDate(DateTime $date): void
    {
        $this->date = $date;
    }

    /**
     * Obtém data do evento
     * @return DateTime
     */
    public function getDate(): DateTime
    {
        return $this->date;
    }

    /**
     * Define Horários de início e fim do evento
     * 
     * @param DateTime $inital Horário de início
     * @param DateTime $final Horário de fim
     */
    public function setTime(DateTime $inital, DateTime $final): void
    {
        $this->time = ['inital' => $inital, 'final' => $final];
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
     * @param ArtType 
     */
    public function setArt(ArtType $art): void
    {
        $this->art = $art;
    }

    /**
     * Obtém tipo de arte
     * @return ArtType
     */
    public function getArt(): ArtType
    {
        return $this->art;
    }

    /**
     * Define status do contrato
     * @param AgreementStatus
     */
    public function setStatus(AgreementStatus $status): void
    {
        $this->status = $status;
    }

    /**
     * Obtém status do contrato
     * @return AgreementStatus
     */
    public function getStatus(): AgreementStatus
    {
        return $this->status;
    }



    public function toArray(): array
    {
        return array_filter(array_merge(parent::toArray(), [
            'hirer' => $this->hirer,
            'hired' => $this->hired,
            'price' => $this->price,
            'date' => $this->date->format(AgreementDB::USUAL_DATE_FORMAT),
            'art' => $this->art ?? null,
            'time' => array_map(fn($time) => $time->format(AgreementDB::USUAL_TIME_FORMAT), $this->time ?? []),
            'status' => $this->status->value ?? null
        ]), fn($value) => isset($value));
    }
}