<?php

namespace App\Model;

use App\DAO\RateDB;
use App\Util\DataFormmatException;

class Rate extends \App\Model\Template\Entity
{
    /**
     * ID do autor da avaliação
     * @var string
     */
    private string $author;

    /**
     * ID do contrato avaliado
     * @var string
     */
    private string $agreement;

    /**
     * Nota da avaliação
     * @var float|string
     */
    private float|string $rate;

    /**
     * Descrição da avaliação
     * @var string
     */
    private string $description;


    /**
     * 
     * @param string ID do contrato
     */
    function __construct(string $agreement)
    {
        parent::__construct();
        $this->agreement = $this->validator->isUUID($agreement) ? $agreement : throw new DataFormmatException('AGREEMENT ID');
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Rate($attr[RateDB::AGREEMENT]);

        $entity->author = $attr[RateDB::AUTHOR];
        $entity->rate = $attr[RateDB::RATE];
        $entity->description = $attr[RateDB::DESCRIPTION];

        return $entity;
    }

    public function toArray(): array
    {
        return [
            'author' => $this->author,
            'agreement' => $this->agreement,
            'rate' => $this->rate,
            'description' => $this->description,
        ];
    }

    /**
     * Obtém o ID do contrato
     * @return string
     */
    public function getAgreement(): string
    {
        return $this->agreement;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    /**
     * Obtém o ID do autor da avaliação
     * @return string
     */
    public function getAuthor(): string
    {
        return $this->author;
    }

    /**
     * Define a descrição
     * @param string
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * Obtém a descrição
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Define a nota
     * @param float
     */
    public function setRate(float $rate): void
    {
        $this->rate = $rate;
    }

    /**
     * Obtém o Nota da avaliação
     * @return float
     */
    public function getRate(): float
    {
        return intval($this->rate);
    }
}
