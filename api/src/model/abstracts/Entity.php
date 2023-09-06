<?php

namespace App\Model\Template;

use App\Util\DataFormatException;
use App\Util\DataValidator;

/**
 * Classe abstrata de uma entidade
 * @package App\Model\Template
 * @author Ariel Santos (MrXacx)
 */
abstract class Entity
{
    /**
     * ID da entidade
     * @var string
     */
    protected string $id;

    /**
     * Objeto de validação
     * @var DataValidator
     */
    protected DataValidator $validator;

    function __construct()
    {
        $this->validator = new DataValidator;
    }

    /**
     * Define ID da entidade
     * @param string
     */
    public function setID(string $id): void
    {
        $this->id = $this->validator->isUUID($id) ? $id : throw new DataFormatException('ID');
    }

    /**
     * Obtém ID da entidade
     * @return string
     */
    public function getID(): string
    {
        return $this->id;
    }

    /**
     * Converte objeto em array
     * @return array
     */
    public function toArray(): array
    {
        return ['id' => $this->id ?? null];
    }

    /**
     * Obtém intância da classe através de um array associativo
     * @param array
     */
    abstract public static function getInstanceOf(array $attr): self;
}