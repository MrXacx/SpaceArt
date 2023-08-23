<?php

namespace App\Model;

use App\DAO\Enumerate\RateColumn;

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
        $entity = new Rate($attr[RateColumn::AGREEMENT]);

        $entity->author = $attr[RateColumn::AUTHOR];
        $entity->rate = $attr[RateColumn::RATE];
        $entity->description = $attr[RateColumn::DESCRIPTION];

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
