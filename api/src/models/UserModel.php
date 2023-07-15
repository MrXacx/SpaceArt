<?php

declare(strict_types = 1);
namespace App\Models;

class UserModel{
    
    const NAME = 'full_name';
    const PWD = 'pwd';
    const DOCUMENT_NUMBER = 'document';
    const EMAIL = 'email';
    const CEP = 'cep';
    const FOLLOWERS = 'followers';

    public string $id;
    public string $name;
    public string $email;
    public string $pwd;
    public string $documentNumber;
    public string $cep;
    public array $followers;

    function __construct(string $name, string $email, string $pwd, string $documentNumber, string $cep){
        $this->name = $name;
        $this->email = $email;
        $this->pwd = $pwd;
        $this->documentNumber = $documentNumber;
        $this->cep = $cep;
    }

    public function setFollowers(array $followers): void{
        $this->followers = $followers;
    }
    public function getFollowers(): array{
        return $this->followers;
    }

    public function addFollower(string $id): void{
        $this->followers[] = $id;
    }

    public function removeFollower(string $id): void{
        $this->followers = array_filter($this->followers, fn($value) => $value != $id);
    }

    public static function isColumn(string $column):bool{
        $columns = [self::NAME, self::PWD, self::DOCUMENT_NUMBER, self::EMAIL, self::CEP, self::FOLLOWERS];
        return !is_bool(array_search($column,$columns));
    }

    public static function get(array $attr): UserModel{
        $model = new UserModel(
            $attr[UserModel::NAME],
            $attr[UserModel::EMAIL],
            $attr[UserModel::PWD],
            $attr[UserModel::DOCUMENT_NUMBER],
            $attr[UserModel::CEP]
        );

        if(!empty($attr[UserModel::FOLLOWERS])){
            $model->setFollowers(json_decode($attr[UserModel::FOLLOWERS]));
        }

        return $model;
    }
}

?>