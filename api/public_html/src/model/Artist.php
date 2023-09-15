<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\ArtistDB;
use App\DAO\UsersDB;
use App\Model\Enumerate\AccountType;
use App\Model\Enumerate\ArtType;
use App\Util\Exception\DataFormatException;

/**
 * Classe modelo de artista
 * @package Model
 * @abstract User
 * @author Ariel Santos (MrXacx)
 */
class Artist extends \App\Model\Template\User
{
    /**
     * Código de Pessoa Física
     * @var string
     */
    private string $CPF;

    /**
     * Tipo de art
     * @var ArtType|string
     */
    private ArtType|string $art;

    /**
     * Pretensão salarial por hora
     * @var string|float
     */
    private string|float $wage;

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Artist;

        foreach ($attr as $key => $value) {

            $atributeName = match ($key) {
                'id' => 'id',
                UsersDB::EMAIL => 'email',
                UsersDB::PASSWORD => 'password',
                UsersDB::NAME => 'name',
                UsersDB::PHONE => 'phone',
                UsersDB::CEP => 'CEP',
                UsersDB::FEDERATION => 'federation',
                UsersDB::CITY => 'city',
                ArtistDB::CPF => 'CPF',
                ArtistDB::ART => 'art',
                ArtistDB::WAGE => 'wage',
                UsersDB::SITE => 'website',
                UsersDB::RATE => 'rate',

                default => null
            };

            if (isset($atributeName)) {
                $entity->$atributeName = $value;
            }

        }

        return $entity;
    }

    /**
     * Insere código de pessoa física
     * @param string $CPF código
     */
    public function setCPF(string $CPF): void
    {
        $this->CPF = $this->validator->isCPF($CPF) ? $CPF : DataFormatException::throw('CPF');
    }

    /**
     * Obtém código de pessoa física
     * @return string Número de identificação
     */
    public function getCPF(): string
    {
        return $this->CPF;
    }

    /**
     * Insere tipo de arte
     * @param ArtType
     */
    public function setArt(ArtType $art): void
    {
        $this->art = $art;
    }

    /**
     * Obtém tipo de arte
     * @return ArtType 
     */
    public function getArt(): ArtType
    {
        return $this->art;
    }
    /**
     * Insere pretensão salarial
     * @param string $wage
     */
    public function setWage(float $wage): void
    {
        $this->wage = $wage;
    }

    /**
     * Obtém pretensão salarial
     * @return string Número de identificação
     */
    public function getWage(): float
    {
        return $this->wage;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'CPF' => $this->CPF ?? null,
            'art' => $this->art,
            'wage' => $this->wage,
            'type' => AccountType::ARTIST->value
        ]);
    }
}