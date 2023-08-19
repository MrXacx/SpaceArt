<?php

declare(strict_types=1);

namespace App\Model;

use App\DAO\Enumerate\UserColumn;
use App\Model\Enumerate\AccountType;

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
    private string $password;

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
     * Tipo de conta
     * @var AccountType
     */
    private AccountType $type;

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
     * @param string $password Senha do usuário
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
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
     * Define tipo de conta
     * @param AccountType 
     */
    public function setEnterprise(AccountType $type): void
    {
        $this->type = $type;
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
        return $this->password;
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
     * Obtém o tipo de usuário
     * @return AccountType
     */
    public function getType(): AccountType
    {
        return $this->type;
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


        foreach ($attr as $key => $value) {
            $atributeName = match ($key) {
                'id' => 'id',
                UserColumn::EMAIL => 'email',
                UserColumn::PASSWORD => 'password',
                UserColumn::NAME => 'name',
                UserColumn::CEP => 'cep',
                UserColumn::CPF => 'CPF',
                UserColumn::CNPJ => 'CNPJ',
                UserColumn::PHONE => 'phone',
                UserColumn::SITE => 'website',
                UserColumn::TYPE => 'type',
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
            'password' => $this->password ?? null,
            'phone' => $this->phone ?? null,
            'CPF' => $this->CPF,
            'CNPJ' => $this->CNPJ,
            'CEP' => $this->CEP,
            'website' => $this->website,
            'type' => $this->type,
        ]), fn ($value) => isset($value));
    }
}
