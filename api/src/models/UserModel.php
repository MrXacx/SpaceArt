<?php

declare(strict_types = 1);
namespace App\Models;

use App\DAO\UserDB;

/**
 * Classe modelo de usuário
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class UserModel{

    /**
     * ID do usuário
     * @var string
     */
        private string $id;

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
    private string $website;

    /**
     * @param $email Email do usuário
     * @param $pwd Senha do usuário
     */
    function __construct( string $email, string $pwd){
        $this->email = $email;
        $this->pwd = $pwd;
    }

    /**
     * @param string $id ID do usuário
     */
    public function setID(string $id): void{
        $this->id = $id;
    }

    /**
     * @param string $name Nome do usuário
     */
    public function setName(string $name): void{
        $this->name = $name;
    }

    /**
     * @param string $phone Telefone do usuário
     */
    public function setPhone(string $phone): void{
        $this->phone = $phone;
    }

    /**
     * @param string $documentNumber Cpf/Cnpj do usuário
     */
    public function setDocumentNumber(string $documentNumber): void{
        $this->documentNumber = $documentNumber;
    }

    /**
     * @param string $cep CEP do usuário
     */
    public function setCEP(string $cep): void{
        $this->cep = $cep;
    }

    /**
     * @param string $website URL do website do usuário
     */
    public function setWebsite(string $website): void{
        $this->website = $website;
    }

    /**
     * Obtém ID do usuário
     * @return string ID 
     */
    public function getID(): string{
        return $this->id;
    }

    /**
     * Obtém Nome do usuário
     * @return string nome
     */
    public function getName(): string{
        return $this->name;
    }

    /**
     * Obtém Email do usuário
     * @return string Email 
     */
    public function getEmail(): string{
        return $this->email;
    }

    /**
     * Obtém Número de telefone do usuário
     * @return string Número de telefone 
     */
    public function getPhone(): string{
        return $this->phone;
    }

    /**
     * Obtém senha do usuário
     * @return string senha 
     */
    public function getPassword(): string{
        return $this->pwd;
    }

    /**
     * Obtém cpf/cnpj do usuário
     * @return string Código de cpf/cnpj 
     */
    public function getDocumentNumber(): string{
        return $this->documentNumber;
    }

    /**
     * Obtém cep do usuário
     * @return string cep 
     */
    public function getCEP(): string{
        return $this->cep;
    }

    /**
     * Obtém ID do usuário
     * @return string ID 
     */
    public function getWebsite(): string{
        return $this->website;
    }

    /**
     * Obtém um modelo de usuário inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstaceOf(array $attr): self{
        $model = new UserModel($attr[UserDB::EMAIL], $attr[UserDB::PWD]);
        $model->id =$attr['id'];
        $model->name = $attr[UserDB::NAME];
        $model->cep = $attr[UserDB::CEP];
        $model->phone = $attr[UserDB::PHONE] ?? null;
        $model->documentNumber = $attr[UserDB::DOCUMENT_NUMBER] ?? null;

        if(isset($attr[UserDB::SITE])){ // Executa se a posição existir
            $model->website = $attr[UserDB::SITE];
        }

        return $model;
    }
}

?>