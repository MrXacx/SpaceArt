<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\Enumerate\SelectionColumn;

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
    public string $ownerID;

    /**
     * Valor da seleção
     * @var string
     */
    private string $price;

    /**
     * Tipo de arte
     * @var string
     */
    private string $art;

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
        $entity->ownerID = $attr[SelectionColumn::OWNER_ID];
        $entity->price = $attr[SelectionColumn::PRICE];
        $entity->art = $attr[SelectionColumn::ART];

        $datetime = [explode(' ', $attr[SelectionColumn::INITAL_DATETIME]), explode(' ', $attr[SelectionColumn::FINAL_DATETIME])];
        $entity->date = ['inital' => $datetime[0][0], 'final' => $datetime[1][0]];
        $entity->time = ['inital' => $datetime[0][1], 'final' => $datetime[1][1]];
        $entity->locked = boolval($attr[SelectionColumn::LOCKED]);

        return $entity;
    }

    /**
     * @param string $ownerID ID do criador da seleção
     */
    function setOwnerID(string $ownerID)
    {
        $this->ownerID =  $ownerID;
    }

    /**
     * Obtém ID do criador da selção
     *  
     * @return string ID
     */
    public function getOwnerID(): string
    {
        return $this->ownerID;
    }

    /**
     * Define Valor da seleção
     * 
     * @param string $price Valor da seleção
     */
    public function setPrice(int $price)
    {
        $this->price = $price . '';
    }

    /**
     * Obtém Valor da seleção
     * 
     * @return string Preço
     */
    public function getPrice(): string
    {
        return $this->price;
    }

    /**
     * Define datas de início e fim da seleção
     * 
     * @param string $inital Data de início
     * @param string $inital Data de fim
     */
    public function setDate(string $inital, string $final)
    {
        $this->date = ['inital' => $inital, 'final' => $final];
    }

    /**
     * Define Horários de início e fim da seleção
     * 
     * @param string $inital Horário de início
     * @param string $inital Horário de fim
     */
    public function setTime(string $inital, string $final)
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
     * @param string $art tipo de arte
     */
    public function setArt(string $art)
    {
        $this->art = $art;
    }

    /**
     * Obtém tipo de arte
     * 
     * @return string Arte a ser praticada
     */
    public function getArt(): string
    {
        return $this->art;
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
            'owner' => $this->ownerID,
            'price' => $this->price ?? null,
            'art' => $this->art ?? null,
            'date' => $this->date ?? null,
            'time' => $this->time ?? null,
            'locked' => boolval($this->time ?? null),
        ]), fn ($value) => isset($value));
    }
}
