<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\AgreementDB;
use App\Model\Enumerate\AgreementStatus;

/**
 * Classe modelo de contratos
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
     * @var int|string
     */
    private int|string $price;

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


    private AgreementStatus $status;

    /**
     * Obtém um modelo de contrato inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return Agreement Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {
        $entity = new Agreement();
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
                    $entity->date = $value;
                    break;
                case AgreementDB::INITAL_TIME:
                    $entity->time['inital'] = $value;
                    break;
                case AgreementDB::FINAL_TIME:
                    $entity->time['final'] = $value;
                    break;
                case AgreementDB::ART:
                    $entity->art = $value;
                    break;
                case AgreementDB::STATUS:
                    $entity->status = $value;
                    break;
            }
        }

        return $entity;
    }

    /** 
     * @param string $hirer ID do contratante
     */
    function setHirer(string $hirer)
    {
        $this->hirer = $hirer;
    }

    /**
     * Obtém ID do contratante
     * 
     * @return string ID
     */
    public function getHirer(): string
    {
        return $this->hirer;
    }

    /** 
     * @param string $hired ID do contratado
     */
    function setHired(string $hired)
    {
        $this->hired = $hired;
    }

    /**
     * Obtém ID do contratado
     * 
     * @return string ID
     */
    public function gethired(): string
    {
        return $this->hired;
    }

    /** 
     * @param string $price Valor do contrato
     */
    function setPrice(int $price)
    {
        $this->price = $price;
    }

    /**
     * Obtém Valor do contrato
     * 
     * @return string Preço
     */
    public function getPrice(): int
    {
        return intval($this->price);
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

    public function setStatus(AgreementStatus $status): void
    {
        $this->status = $status;
    }

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
            'date' => $this->date,
            'art' => $this->art ?? null,
            'time' => $this->time ?? null,
            'status' => $this->status ?? null
        ]), fn ($value) => isset($value));
    }
}
