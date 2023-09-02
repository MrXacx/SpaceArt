<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\SelectionDB;
use App\Model\Enumerate\ArtType;
use App\Util\DataFormatException;
use DateTime;

/**
 * Classe modelo de seleção
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class Selection extends \App\Model\Template\Entity
{
    /**
     * ID do criador da seleção
     * @var string
     */
    public string $owner;

    /**
     * Valor da seleção
     * @var string
     */
    private float|string $price;

    /**
     * Tipo de arte
     * @var ArtType
     */
    private ArtType $art;

    /**
     * Datas de início e fim
     * @var array
     */
    private array $date;

    /**
     * Datas de início e fim
     * @var array
     */
    private array $time;

    /**
     * Status da seleção
     * @var bool
     */
    private bool $locked = false;


    /**
     * Obtém um modelo de seleção inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {

        $entity = new Selection();
        $entity->id = $attr['id'];
        $entity->owner = $attr[SelectionDB::OWNER];
        $entity->price = $attr[SelectionDB::PRICE];
        $entity->art = $attr[SelectionDB::ART];

        $datetime = [explode(' ', $attr[SelectionDB::INITAL_DATETIME]), explode(' ', $attr[SelectionDB::FINAL_DATETIME])];
        $entity->date = ['inital' => $datetime[0][0], 'final' => $datetime[1][0]];
        $entity->time = ['inital' => $datetime[0][1], 'final' => $datetime[1][1]];
        $entity->locked = boolval($attr[SelectionDB::LOCKED]);

        return $entity;
    }

    /**
     * @param string $owner ID do criador da seleção
     */
    function setOwner(string $owner)
    {
        $this->owner = $this->validator->isUUID($owner) ? $owner : throw new DataFormatException('ID');
    }

    /**
     * Obtém ID do criador da selção
     *  
     * @return string ID
     */
    public function getOwner(): string
    {
        return $this->owner;
    }

    /**
     * Define Valor da seleção
     * 
     * @param float $price Valor da seleção
     */
    public function setPrice(float $price)
    {
        $this->price = $price;
    }

    /**
     * Obtém Valor da seleção
     * 
     * @return string Preço
     */
    public function getPrice(): float
    {
        return floatval($this->price);
    }

    /**
     * Define datas de início e fim da seleção
     * 
     * @param DateTime $inital Data de início
     * @param DateTime $inital Data de fim
     */
    public function setDate(DateTime $inital, DateTime $final)
    {
        $this->date = ['inital' => $inital->format(SelectionDB::DB_DATE_FORMAT), 'final' => $final->format(SelectionDB::DB_DATE_FORMAT)];
    }

    /**
     * Define Horários de início e fim da seleção
     * 
     * @param DateTime $inital Horário de início
     * @param DateTime $inital Horário de fim
     */
    public function setTime(DateTime $inital, DateTime $final)
    {
        $this->time = ['inital' => $inital, 'final' => $final];
    }

    /**
     * Obtém Datas e horários de início e fim do modelo
     * 
     * @return array Vetor de datetimes
     */
    public function getDatetime(): array
    {
        return [
            'inital' => $this->date['inital'] . " " . $this->time['inital'],
            'final' => $this->date['final'] . " " . $this->time['final']
        ];
    }

    /**
     * Define tipo de arte da seleção
     * 
     * @param ArtType $art tipo de arte
     */
    public function setArt(ArtType $art)
    {
        $this->art = $art;
    }

    /**
     * Obtém tipo de arte
     * 
     * @return ArtType Arte a ser praticada
     */
    public function getArt(): ArtType
    {
        return $this->art;
    }

    /**
     * Define se a seleção foi finalizada
     * @param bool
     */
    public function setLocked(bool $locked): void
    {
        $this->locked = $locked;
    }

    /**
     * Checa se a seleção foi finalizada
     * @return bool
     */
    public function isLocked(): bool
    {
        return $this->locked;
    }

    public function toArray(): array
    {
        return array_filter(array_merge(parent::toArray(), [
            'owner' => $this->owner,
            'price' => $this->price ?? null,
            'art' => $this->art ?? null,
            'date' => $this->date ?? null,
            'time' => $this->time ?? null,
            'locked' => boolval($this->time ?? null),
        ]), fn($value) => isset($value));
    }
}