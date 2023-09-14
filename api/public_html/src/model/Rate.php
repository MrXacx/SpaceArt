<?php

namespace App\Model;

use App\DAO\RateDB;
use App\Util\DataFormatException;

/**
 * Classe modelo de avaliação
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
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
        $this->agreement = $this->validator->isUUID($agreement) ? $agreement : DataFormatException::throw('AGREEMENT ID');
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
     * @return string Contrato
     */
    public function getAgreement(): string
    {
        return $this->agreement;
    }

    /**
     * Define ID do autor
     * @param string $author Autor
     */
    public function setAuthor(string $author): void
    {
        $this->author = $this->validator->isUUID($author) ? $author : DataFormatException::throw('AUTHOR ID');
    }

    /**
     * Obtém o ID do autor
     * @return string Autor
     */
    public function getAuthor(): string
    {
        return $this->author;
    }

    /**
     * Define a descrição
     * @param string Descrição
     */
    public function setDescription(string $description): void
    {
        $this->description = $this->validator->isFit($description) ? $description : DataFormatException::throw('DESCRIPTION', DataFormatException::LENGTH);
    }

    /**
     * Obtém a descrição
     * @return string Descrição
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Define a nota
     * @param float Nota
     */
    public function setRate(float $rate): void
    {
        $this->rate = $rate;
    }

    /**
     * Obtém o Nota da avaliação
     * @return float Nota
     */
    public function getRate(): float
    {
        return floatval($this->rate);
    }
}