<?php

namespace App\Controller;

use App\Server;
use App\DAO\ArtistDB;
use App\DAO\EnterprisesDB;
use App\DAO\UsersDB;
use App\Model\User;

use App\Util\DataValidator;
use App\Model\Enumerate\AccountType;
use RuntimeException;

class UserController
{
    private DataValidator $validator;
    private \Symfony\Component\HttpFoundation\ParameterBag $parameters;

    function __construct()
    {
        $this->validator = new DataValidator();
        $this->parameters = Server::getParameters();
    }

    private function removeNullValues(array $arr): array
    {
        return array_filter($arr, fn ($value) => isset($value));
    }

    public function getUnique(): array
    {
        $id = $this->parameters->get('id').'';

        // Confere se id corresponde ao formato correto
        if ($this->validator->isUUID($id)) {

            $user = new User();
            $user->setID($id);

            $db = new UsersDB($user); // Inicia objeto para manipular o registro do usuário informado
            return $this->removeNullValues($db->getUser()->toArray())();
        }

        throw new RuntimeException('ID do usuário não foi informado ou apresenta formato inconsistente');
    }

    public function signIn(): array
    {
        /*
            No ato do login, o sistema servido deve possuir email e senha do usuário,
            mas pode não ter acesso ao id desse. Portanto, a API deve retornar apenas
            o id consultado com base nos dados informados.  
        */

        $email = $this->parameters->get('email') . '';
        $password = $this->parameters->get('password') . '';

        if ($this->validator->isEmail($email) && $this->validator->isValidVarcharLength($password, UsersDB::PASSWORD)) {
            $user = new User();

            $user->setEmail($email);
            $user->setPassword($password);

            $db = new UsersDB($user);
            return $db->getID();
        }

        throw new RuntimeException('Email e/ou senha não foram informados ou apresentam formato inconsistente');
    }

    /**
     * Obtém lista de usuários
     */
    public function getList(): array
    {

        $type = $this->parameters->get('type'); // Obtém tipo da conta
        $offset = intval($this->parameters->get('offset')); // Obtém posição de início da leitura
        $limit = intval($this->parameters->get('limit')); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }

        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }

        $dao = match ($type) { //Obtém objeto adequado para o tipo de conta
            AccountType::ARTIST => new ArtistDB(),
            AccountType::ENTERPRISE => new EnterprisesDB(),
            default => throw new RuntimeException('O tipo da conta não foi informado ou não foi reconhecido') // Lança exceção
        };

        $list = $dao->getList($offset, $limit);
        return  array_map(fn ($user) => $this->removeNullValues($user->toArray()), $list);
    }

    /**
     * Deleta usuário
     */
    public function delete(): bool
    {
        $id = $this->parameters->get('id');

        if (isset($id)) { // Executa se o id foi informado
            $user = new User();
            $user->setID($id);

            $db = new UsersDB($user);
            return $db->delete();
        }
        
        return false;
    }
}
