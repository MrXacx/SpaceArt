<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\EnterpriseDB;
use App\DAO\UsersDB;

/**
 * Classe modelo de usuário
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class Enterprise extends User
{
    /**
     * Número de identificação nacional de empreendimentos
     * @var string
     */
    private string $CNPJ;


    /**
     * Obtém um modelo de usuário inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {
        $entity = new Enterprise();

        foreach ($attr as $key => $value) {
            $atributeName = match ($key) {
                'id' => 'id',
                UsersDB::EMAIL => 'email',
                UsersDB::PASSWORD => 'password',
                UsersDB::NAME => 'name',
                EnterpriseDB::CNPJ => 'CNPJ',
                UsersDB::CEP => 'CEP',
                UsersDB::FEDERATION => 'federation',
                UsersDB::CITY => 'federation',
                EnterpriseDB::DISTRICT => 'district',
                EnterpriseDB::ADDRESS => 'address',
                UsersDB::PHONE => 'phone',
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
     * Insere código de identificação do empreendimento
     * @param string $CNPJ código
     */
    public function setCNPJ(string $CNPJ): void
    {
        $this->CNPJ = $CNPJ;
    }

    /**
     * Obtém número de identificação do empreendimento
     * @return string|null Número de identificação ou nulo, caso não tenha sido informado
     */
    public function getCNPJ(): string|null
    {
        return $this->CNPJ;
    }

    public function toArray(): array
    {

        return array_merge(parent::toArray(), [
            'CNPJ' => $this->CNPJ,

        ]);
    }
}
