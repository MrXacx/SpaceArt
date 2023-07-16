<?php

declare(strict_types = 1);
namespace App\Models;

/**
 * Classe modelo de usuário
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class UserModel{
    /**
     * Nome da coluna de nome do usuário
     * @var string
     */
    public const NAME = 'full_name';
    
    /**
     * Nome da coluna de senha 
     * @var string
     */
    public const PWD = 'pwd';
    
    /**
     * Nome da coluna de cpf/cnpj
     * @var string
     */
    public const DOCUMENT_NUMBER = 'document';
    
    /**
     * Nome da coluna de email
     * @var string
     */
    public const EMAIL = 'email';
    
    /**
     * Nome da coluna de cep
     * @var string
     */
    public const CEP = 'cep';
    
    /**
     * Nome da coluna de contas seguidas
     * @var string
     */
    public const FOLLOWING = 'following';
    
    
    /**
     * ID do usuário
     * @var string
     */
    
    public string $id;
    
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
    public array $followingList;
    
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
    public function addFollower(string $id): void{
        $this->followingList[] = $id;
    }

    /**
     * Remove ID ao array de contas seguidas
     * 
     * @param string $id ID da conta a ser removida
     * @return void
     */
    public function removeFollower(string $id): void{
        $this->followingList = array_filter($this->followingList, fn($value) => $value != $id);
    }

    /**
     * Confere se string é compatível com alguma coluna da tabela
     * 
     * @param string Coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column):bool{
        $columns = [self::NAME, self::PWD, self::DOCUMENT_NUMBER, self::EMAIL, self::CEP, self::FOLLOWING];
        return !is_bool(array_search($column,$columns));
    }

    /**
     * Obtém um modelo de usuário inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function get(array $attr): self{
        $model = new UserModel(
            $attr[static::NAME],
            $attr[static::EMAIL],
            $attr[static::PWD],
            $attr[static::DOCUMENT_NUMBER],
            $attr[static::CEP]
        );

        if(!empty($attr[static::FOLLOWING])){ // Adiciona lista de contas seguidas, se existir
            $model->setFollowingList(json_decode($attr[static::FOLLOWING]));
        }

        return $model;
    }
}

?>