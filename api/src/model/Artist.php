<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\ArtistDB;
use App\DAO\UsersDB;

/**
 * Classe modelo de usuário
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class Artist extends User
{
    /**
     * Número de identificação nacional de empreendimentos
     * @var string
     */
    private string $CPF;
    private string $art;
    private float $wage;

    /**
     * Obtém um modelo de usuário inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {
        $entity = new Artist();

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

                default => null
            };

            if (isset($atributeName)) {
                $entity->$atributeName = $value;
            }
        }

        return $entity;
    }

    /**
     * Insere código de identificação do usuário
     * @param string $CPF código
     */
    public function setCPF(string $CPF): void
    {
        $this->CPF = $CPF;
    }

    /**
     * Obtém número de identificação do usuário
     * @return string Número de identificação
     */
    public function getCPF(): string
    {
        return $this->CPF;
    }

    /**
     * Insere código de identificação do usuário
     * @param string $CPF código
     */
    public function setArt(string $art): void
    {
        $this->art = $art;
    }

    /**
     * Obtém número de identificação do usuário
     * @return string Número de identificação
     */
    public function getArt(): string
    {
        return $this->art;
    }
    /**
     * Insere código de identificação do usuário
     * @param string $CPF código
     */
    public function setWage(float $wage): void
    {
        $this->wage = $wage;
    }

    /**
     * Obtém número de identificação do usuário
     * @return string Número de identificação
     */
    public function getWage(): float
    {
        return $this->wage;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'CPF' => $this->CPF,
            'art' => $this->art,
            'wage_to_hourly' => $this->wage,
        ]);
    }
}
