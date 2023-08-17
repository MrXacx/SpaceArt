<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\UsersDB;

/**
 * Classe modelo de usuário
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class User extends \App\Model\Template\Entity
{
    /**
     * Nome completo do usuário
     * @var string
     */
    private string $name;

    /**
     * Email do usuário
     * @var string
     */
    private string $email;

    /**
     * Número de telefone do usuário
     * @var string
     */
    private string $phone;

    /**
     * Senha do usuário
     * @var string
     */
    private string $pwd;

    /**
     * Número de idenficação nacional pessoal
     * @var string|null
     */
    private string|null $CPF = null;

    /**
     * Número de identificação nacional de empreendimentos
     * @var string|null
     */
    private string|null $CNPJ = null;

    /**
     * Controle do tipo de conta
     * @var bool
     */
    private bool $enterprise;

    /**
     * CEP do usuário
     * @var string
     */
    private string $CEP;

    /**
     * site do usuário
     * @var string
     */
    private string|null $website = null;


    /**
     * @param string $pwd Senha do usuário
     */
    public function setPassword(string $pwd): void
    {
        $this->pwd = $pwd;
    }
    /**
     * @param string $email Email do usuário
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @param string $id ID do usuário
     */
    public function setID(string $id): void
    {
        $this->id = $id;
    }

    /**
     * @param string $name Nome do usuário
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @param string $phone Telefone do usuário
     */
    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
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
     * Insere código de identificação do empreendimento
     * @param string $CNPJ código
     */
    public function setCNPJ(string $CNPJ): void
    {
        $this->CNPJ = $CNPJ;
    }

    /**
     * @param string $CEP CEP do usuário
     */
    public function setCEP(string $CEP): void
    {
        $this->CEP = $CEP;
    }

    /**
     * @param string $website URL do website do usuário
     */
    public function setWebsite(string $website): void
    {
        $this->website = $website;
    }

    /**
     * Define se o usuário é um empreendimento
     * @param bool 
     */
    public function setEnterprise(bool $enterprise): void
    {
        $this->enterprise = $enterprise;
    }

    /**
     * Obtém ID do usuário
     * @return string ID 
     */
    public function getID(): string
    {
        return $this->id;
    }

    /**
     * Obtém Nome do usuário
     * @return string nome
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Obtém Email do usuário
     * @return string Email 
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Obtém Número de telefone do usuário
     * @return string Número de telefone 
     */
    public function getPhone(): string
    {
        return $this->phone;
    }

    /**
     * Obtém senha do usuário
     * @return string senha 
     */
    public function getPassword(): string
    {
        return $this->pwd;
    }

    /**
     * Obtém número de identificação do usuário
     * @return string|null Número de identificação ou nulo, caso não tenha sido informado
     */
    public function getCPF(): string|null
    {
        return $this->CPF;
    }

    /**
     * Obtém número de identificação do empreendimento
     * @return string|null Número de identificação ou nulo, caso não tenha sido informado
     */
    public function getCNPJ(): string|null
    {
        return $this->CNPJ;
    }

    /**
     * Obtém CEP do usuário
     * @return string CEP 
     */
    public function getCEP(): string
    {
        return $this->CEP;
    }

    /**
     * Obtém ID do usuário
     * @return string ID 
     */
    public function getWebsite(): string
    {
        return $this->website;
    }

    /**
     * Obtém informação do tipo de usuário
     * @return bool true caso de de empreendimento, false em caso de artista
     */
    public function isEnterprise(): bool
    {
        return $this->enterprise;
    }

    /**
     * Obtém um modelo de usuário inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstanceOf(array $attr): self
    {
        $entity = new User();

        $entity->enterprise = boolval($attr[UsersDB::ENTERPRISE]);

        foreach ($attr as $key => $value) {
            $atributeName = match ($key) {
                'id' => 'id',
                UsersDB::EMAIL => 'email',
                UsersDB::PWD => 'pwd',
                UsersDB::NAME => 'name',
                UsersDB::CEP => 'cep',
                UsersDB::CPF => 'CPF',
                UsersDB::CNPJ => 'CNPJ',
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

    public function toArray(): array
    {
        return array_filter(array_merge(parent::toArray(), [
            'name' => $this->name,
            'email' => $this->email ?? null,
            'password' => $this->pwd ?? null,
            'phone' => $this->phone ?? null,          
            'CPF' => $this->CPF,
            'CNPJ' => $this->CNPJ,
            'CEP' => $this->CEP,
            'website' => $this->website,
            'enterprise' => $this->enterprise,
        ]), fn ($value) => isset($value));
    }

}
