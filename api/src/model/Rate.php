<?php

namespace App\Model;

use App\DAO\RateDB;

class Rate extends \App\Model\Template\Entity
{
    private string $author;
    private string $agreement;
    private int|string $rate;
    private string $description;

    function __construct(string $agreement)
    {
        $this->agreement = $agreement;
        parent::__construct();
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

    public function getAgreement(): string
    {
        return $this->agreement;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setRate(int $rate): void
    {
        $this->rate = $rate;
    }

    public function getRate(): int
    {
        return intval($this->rate);
    }
}
