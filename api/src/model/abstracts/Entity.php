<?php

namespace App\Model\Template;

use App\Util\DataValidator;

abstract class Entity
{

    protected string $id;


    /**
     * Objeto de validação
     * @var DataValidator
     */
    protected DataValidator $validator;

    function __construct()
    {
        $this->validator = new DataValidator();
    }
    

    public function setID(string $id): void
    {
        $this->id = $id;
    }

    public function getID(): string
    {
        return $this->id;
    }

    public function toArray(): array{
        return ['id' => $this->id ?? null];
    }
    abstract public static function getInstanceOf(array $attr): self;
}
