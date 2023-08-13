<?php

namespace App\Controller;

use App\DAO\UsersDB;
use App\Model\User;
use App\Util\DataValidator;
use RuntimeException;

class UserRoute
{
    private DataValidator $validator;
    function __construct()
    {
        $this->validator = new DataValidator();
    }

    public function getUnique(): array
    {

        // Confere se id corresponde ao formato correto
        if ($this->validator->isUiid($_GET['id'].'')) {
            $user = new User();
            $user->setID($_GET['id']);

            $db = new UsersDB($user); // Inicia objeto para manipular o registro do usuário informado
            return $db->getUser()->toArray();
        }
        
        throw new RuntimeException('ID do usuário não foi informado ou apresenta formato inconsistente: '. $_GET['id']);
    }

    public function signIn(): array
    {
        /*
            No ato do login, o sistema servido deve possuir email e senha do usuário,
            mas pode não ter acesso ao id desse. Portanto, a API deve retornar apenas
            o id consultado com base nos dados informados.  
        */

        if ($this->validator->isEmail($_GET['email'].'') && $this->validator->isValidVarcharLength($_GET['password'], UsersDB::PWD)) {
            $user = new User();
            $user->setEmail($_GET['email']);
            $user->setPassword($_GET['password']);
            $db = new UsersDB($user);
            return $db->getID();
        }

        throw new RuntimeException('Email e/ou senha não foram informados ou apresentam formato inconsistente');
    }

    public function getList():array
    {
        // Confere se offset é inteiro e superior ao valor mínimo
        $offset = preg_match('#^\d+$#', $_GET['offset']) && $_GET['offset'] >=  Server::DEFAULT_OFFSET  ? intval($_GET['offset']) : Server::DEFAULT_OFFSET;
        
        // Confere se limit é inteiro e não ultrapassa o tamanho máximo da lista
        $limit =  preg_match('#^\d+$#', $_GET['limit']) && $_GET['limit'] <= Server::MAX_LIMIT ? intval($_GET['limit']) : Server::DEFAULT_LIMIT;
        
        // Retorna lista de vetorers com dados dos usuários
        return array_map(fn($user) => $user->toArray(), (new UsersDB())->getList($offset, $limit));
    }
}
