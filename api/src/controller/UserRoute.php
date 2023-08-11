<?php

namespace App\Controller;

use App\DAO\UsersDB;
use App\Model\UserModel;

class UserRoute
{
    public function  queryUsualData()
    {
        $user = new UserModel($_GET['email']);
        $db = new UsersDB($user);

        if (isset($_GET['id'])) {
            $user->setID($_GET['id']);

            return match ($_GET['searched'] ?? null) {
                'name' =>  $db->get(UsersDB::NAME),
                'email' => $db->get(UsersDB::EMAIL),
                'documentNumber' => $db->get(UsersDB::DOCUMENT_NUMBER),
                'phone' => $db->get(UsersDB::PHONE),
                'cep' => $db->get(UsersDB::CEP),
                'website' => $db->get(UsersDB::SITE),
                null => $db->getUser()->toArray(),
                default => throw new \RuntimeException($_GET['searched'] . ' não é um parâmetro aceito')
            };
        }

        return [];
    }

    public function querySignInData()
    {
        /*
            No ato do login, o sistema servido deve possuir email e senha do usuário,
            mas pode não ter acesso ao id desse. Portanto, a api deve retornar apenas
            o id consultado com base nos dados informados.  
        */

        if (isset($_GET['email']) && isset($_GET['password'])) {
            $db = new UsersDB(new UserModel($_GET['email'], $_GET['password']));
            return $db->getID();
        } else {
            return [];
        }
    }
}
