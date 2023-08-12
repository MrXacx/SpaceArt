<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\SelectionsDB;
use App\Util\DataValidator;

/**
 * Classe modelo de seleção
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class SelectionModel extends \App\Model\Template\Entity
{
    /**
     * ID do criador da seleção
     * @var string
     */
    public string|null $ownerID;

    /**
     * Valor da seleção
     * @var string
     */
    private string|null $price;

    /**
     * Tipo de arte
     * @var string
     */
    private string|null $art;

    /**
     * Datas de início e fim
     * @var array
     */
    private array|null $date;

    /**
     * Datas de início e fim
     * @var array
     */
    private array|null $time;

    /**
     * Status da seleção
     * @var bool
     */
    private bool|null $locked = false;

    /**
     * Objeto de validação
     * @var DataValidator
     */
    private DataValidator $validator;

    function __construct()
    {
        $this->validator = new DataValidator();
    }

    /**
     * Obtém um modelo de seleção inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {

        $entity = new SelectionModel();
        $entity->id = $attr['id'];
        $entity->ownerID = $attr[SelectionsDB::OWNER_ID];
        $entity->price = $attr[SelectionsDB::PRICE];
        $entity->art = $attr[SelectionsDB::ART];

        $datetime = [explode(' ', $attr[SelectionsDB::INITAL_DATETIME]), explode(' ', $attr[SelectionsDB::FINAL_DATETIME])];
        $entity->date = ['inital' => $datetime[0][0], 'final' => $datetime[1][0]];
        $entity->time = ['inital' => $datetime[0][1], 'final' => $datetime[1][1]];
        $entity->locked = boolval($attr[SelectionsDB::LOCKED]);

        return $entity;
    }

    /**
     * @param string $ownerID ID do criador da seleção
     */
    function setOwnerID(string $ownerID)
    {
        $this->ownerID = $this->validator->isValidVarcharLength($ownerID, 'id') ? $ownerID : null;;
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
    public function setPrice(string $price)
    {
        $this->price = $this->validator->isPrice($price) ? $price : 'null';
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
        $this->date =  array_combine(['inital', 'final'], $this->validator->isValidDateFormat($inital) && $this->validator->isValidDateFormat($final) ? [$inital, $final] : [null, null]);
    }

    /**
     * Define Horários de início e fim da seleção
     * 
     * @param string $inital Horário de início
     * @param string $inital Horário de fim
     */
    public function setTime(string $inital, string $final)
    {
        $this->time = ['inital' => $this->validator->buildTime($inital), 'final' => $this->validator->buildTime($final)];
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
        $this->art = $this->validator->isValidVarcharLength($art, SelectionsDB::ART) ? $art : null;
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
        ]), fn($value) => isset($value));
    }
}
