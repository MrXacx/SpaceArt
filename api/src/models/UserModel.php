<?php

declare(strict_types = 1);
namespace App\Models;

class UserModel{
    
    const NAME = 'full_name';
    const PWD = 'pwd';
    const DOCUMENT_NUMBER = 'document';
    const EMAIL = 'email';
    const CEP = 'cep';

    public string $id;
    public string $name;
    public string $email;
    public string $pwd;
    public string $documentNumber;
    public string $cep;

    function __construct(string $name, string $email, string $pwd, string $documentNumber, string $cep){
        $this->name = $name;
        $this->email = $email;
        $this->pwd = $pwd;
        $this->documentNumber = $documentNumber;
        $this->cep = $cep;
    }

    public static function isColumn(string $column):bool{
        $columns = [self::NAME, self::PWD, self::DOCUMENT_NUMBER, self::EMAIL, self::CEP];
        return !is_bool(array_search($column,$columns));
    }
}

?>