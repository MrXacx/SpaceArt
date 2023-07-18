<?php

declare(strict_types = 1);
namespace App\Models;

use App\Utils\UserDB;

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
    
    public string $id = '';
    
    /**
     * Nome completo do usuário
     * @var string
     */
    public string $name;
    
    /**
     * Email do usuário
     * @var string
     */
    public string $email;
    
    /**
     * Senha do usuário
     * @var string
     */
    public string $pwd;
    
    /**
     * cpf/cnpj do usuário
     * @var string
     */
    public string $documentNumber;
    
    /**
     * cep do usuário
     * @var string
     */
    public string $cep;
    
    /**
     * contas seguidas
     * @var array
     */
    public array $followingList = [];
    
    /**
     * @param $name Nome do usuário
     * @param $email Email do usuário
     * @param $pwd Senha do usuário
     * @param $documentNumber cpf/cnpj do usuário
     * @param $cep CEP do usuário
     */
    function __construct(string $name, string $email, string $pwd, string $documentNumber, string $cep){

        $this->name = $name;
        $this->email = $email;
        $this->pwd = $pwd;
        $this->documentNumber = $documentNumber;
        $this->cep = $cep;
    }

    /**
     * Insere array de seguidores no modelo
     * 
     * @param array $followingList Array de contas seguidas
     * @return void
     */
    public function setFollowingList(array $followingList): void{
        $this->followingList = $followingList;
    }

    /**
     * Obtém array de IDs de contas seguidas
     * 
     * @return array Array de IDs
     */
    public function getFollowingList(): array{
        return $this->followingList;
    }

    /**
     * Adiciona ID ao array de contas seguidas
     * 
     * @param string $id ID da conta a ser inserida
     * @return void
     */
    public function addFollowing(string $id): void{
        $this->followingList[] = $id;
    }

    /**
     * Remove ID ao array de contas seguidas
     * 
     * @param string $id ID da conta a ser removida
     * @return void
     */
    public function removeFollowing(string $id): void{
        foreach($this->followingList as &$followingID){
            if($id != $followingID){
                $list[] = $followingID;
            }
        }
        $this->followingList = $list;
    }

    /**
     * Obtém um modelo de usuário inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function get(array $attr): self{
        $model = new UserModel(
            $attr[UserDB::NAME],
            $attr[UserDB::EMAIL],
            $attr[UserDB::PWD],
            $attr[UserDB::DOCUMENT_NUMBER],
            $attr[UserDB::CEP]
        );

        if(!empty($attr[UserDB::FOLLOWING])){ // Adiciona lista de contas seguidas, se existir
            $model->setFollowingList(json_decode($attr[UserDB::FOLLOWING]));
        }

        return $model;
    }
}

?>