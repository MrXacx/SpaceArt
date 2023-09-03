<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\UsersDB;
use App\DAO\EnterpriseDB;
use App\Model\Enumerate\AccountType;
use App\Util\DataFormatException;

/**
 * Classe modelo de empreendimento
 * @package Model
 * @abstract User
 * @author Ariel Santos (MrXacx)
 */
class Enterprise extends \App\Model\Template\User
{
    /**
     * Código nacional de pessoa jurídica
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
                UsersDB::CITY => 'city',
                EnterpriseDB::DISTRICT => 'district',
                EnterpriseDB::ADDRESS => 'address',
                UsersDB::PHONE => 'phone',
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
     * Insere código nacional de pessoa jurídica
     * @param string $CNPJ código
     */
    public function setCNPJ(string $CNPJ): void
    {
        $this->CNPJ = $this->validator->isCNPJ($CNPJ) ? $CNPJ : throw new DataFormatException('CNPJ');
    }

    /**
     * Obtém código nacional de pessoa jurídica
     * @return string
     */
    public function getCNPJ(): string
    {
        return $this->CNPJ;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), ['CNPJ' => $this->CNPJ ?? null, 'type' => AccountType::ENTERPRISE->value]);
    }
}