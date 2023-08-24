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
    function __construct()
    {
        $this->validator = new DataValidator();
    }

    private function removeNullValues(array $arr): array
    {
        return array_filter($arr, fn ($value) => isset($value));
    }

    public function getUnique(): array
    {
        $id = $_GET['id'] ?? '';
        // Confere se id corresponde ao formato correto
        if ($this->validator->isUUID($id)) {
            $user = new User();
            $user->setID($_GET['id']);

            $db = new UsersDB($user); // Inicia objeto para manipular o registro do usuário informado
            return $this->removeNullValues($db->getUser()->toArray())();
        }

        throw new RuntimeException('ID do usuário não foi informado ou apresenta formato inconsistente: ' . $_GET['id']);
    }

    public function signIn(): array
    {
        /*
            No ato do login, o sistema servido deve possuir email e senha do usuário,
            mas pode não ter acesso ao id desse. Portanto, a API deve retornar apenas
            o id consultado com base nos dados informados.  
        */

        if ($this->validator->isEmail($_GET['email'] . '') && $this->validator->isValidVarcharLength($_GET['password'], UsersDB::PASSWORD)) {
            $user = new User();
            $user->setEmail($_GET['email']);
            $user->setPassword($_GET['password']);
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
        // Normaliza parâmetros esperados
        $type = $_GET['type'] ?? null;
        $offset = intval($_GET['offset'] ?? null);
        $limit = intval($_GET['limit'] ?? null);

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }

        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo ou ultrapassar o valor máximo
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
    public function delete(): void
    {

        if (isset($_REQUEST['id'])) {
            $user = new User();
            $user->setID($_REQUEST['id']);
            $db = new UsersDB($user);
            $db->delete();
        }
    }
}
