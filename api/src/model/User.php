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
     * cpf/cnpj do usuário
     * @var string
     */
    private string $documentNumber;

    /**
     * cep do usuário
     * @var string
     */
    private string $cep;

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
     * @param string $documentNumber Cpf/Cnpj do usuário
     */
    public function setDocumentNumber(string $documentNumber): void
    {
        $this->documentNumber = $documentNumber;
    }

    /**
     * @param string $cep CEP do usuário
     */
    public function setCEP(string $cep): void
    {
        $this->cep = $cep;
    }

    /**
     * @param string $website URL do website do usuário
     */
    public function setWebsite(string $website): void
    {
        $this->website = $website;
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
     * Obtém cpf/cnpj do usuário
     * @return string Código de cpf/cnpj 
     */
    public function getDocumentNumber(): string
    {
        return $this->documentNumber;
    }

    /**
     * Obtém cep do usuário
     * @return string cep 
     */
    public function getCEP(): string
    {
        return $this->cep;
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
                UsersDB::EMAIL => 'email',
                UsersDB::PWD => 'pwd',
                UsersDB::NAME => 'name',
                UsersDB::CEP => 'cep',
                UsersDB::PHONE => 'phone',
                UsersDB::DOCUMENT_NUMBER => 'documentNumber',
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
            'document_number' => $this->documentNumber ?? null,
            'cep' => $this->cep,
            'website' => $this->website,
        ]), fn ($value) => isset($value));
    }
}
