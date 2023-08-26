<?php

namespace App\Controller;

use App\Server;
use App\DAO\UsersDB;
use App\DAO\ArtistDB;
use App\DAO\EnterpriseDB;
use App\Model\User;
use App\Model\Artist;
use App\Model\Enterprise;
use App\Model\Enumerate\AccountType;
use App\Util\DataValidator;
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

    public function getUser(): array
    {
        $id = $this->parameters->get('id') . '';

        // Confere se id corresponde ao formato correto
        if ($this->validator->isUUID($id)) {

            $user = new User();
            $user->setID($id);

            $db = new UsersDB($user); // Inicia objeto para manipular o registro do usuário informado
            return $this->removeNullValues($db->getUser()->toArray())();
        }

        throw new RuntimeException('ID do usuário não foi informado ou apresenta formato inconsistente');
    }

    /**
     * Obtém dados de acesso ao sistema
     * @return array vetor com dados de acesso
     */
    public function getAcess(): array
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
     * @return array
     */
    public function getUserList(): array
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
            AccountType::ENTERPRISE => new EnterpriseDB(),
            default => throw new RuntimeException('O tipo da conta não foi informado ou não foi reconhecido') // Lança exceção
        };

        $list = $dao->getList($offset, $limit);
        return  array_map(fn ($user) => $this->removeNullValues($user->toArray()), $list);
    }

    /**
     * Armazena usuário
     * @return true caso o usuário seja criado
     */
    public function storeUser(): bool
    {


        if ($this->parameters->get('type') == AccountType::ARTIST) {
            $user = new Artist();

            $this->createGeneralUser($user);

            $user->setCPF($this->parameters->get('cpf') . '');
            $user->setArt($this->parameters->get('art') . '');
            $user->setWage($this->parameters->get('wage') . '');

            $db = new ArtistDB($user);
        } else if ($this->parameters->get('type') == AccountType::ENTERPRISE) {
            $user = new Enterprise();

            $this->createGeneralUser($user);

            $user->setCNPJ($this->parameters->get('cnpj') . '');
            $user->setDistrict($this->parameters->get('district') . '');
            $user->setAddress($this->parameters->get('address') . '');

            $db = new EnterpriseDB($user);
        }

        return $db->create();
    }

    /**
     * Inicia componentes genéricos de usuários
     * @param Artist|Enterprise $user modelo de artista ou empreendimento a ser manipulado
     */
    private function createGeneralUser(Artist|Enterprise $user)
    {
        $user->setName($this->parameters->get('name') . '');
        $user->setEmail($this->parameters->get('email') . '');
        $user->setPassword($this->parameters->get('password') . '');
        $user->setPhone($this->parameters->get('phone') . '');
        $user->setCEP($this->parameters->get('cep') . '');
        $user->setFederation($this->parameters->get('federation') . '');
        $user->setImage($this->parameters->get('image') . '');
    }

    /**
     * Atualiza atributo do usuário
     * @return true caso o dado tenha sido atualizado
     */
    public function updateUser(): bool
    {

        $id = ($this->parameters->get('id') . ''); // RECEBE O ID QUE ESTÁ CADASTRADO NO BANCO
        $column = ($this->parameters->get('column') . ''); // RECEBE A COLUNA QUE SERÁ ALTERADA
        $info = ($this->parameters->get('info') . ''); // RECEBE A INFORMAÇÃO QUE ELE DESEJA ALTERAR DE ACORDO COM A CONTA EM QUE ESTÁ CADASTRADO O ID

        $type = ($this->parameters->get('type')); // RECEBENDO A INFORMAÇÃO DA CONTA
        $user = new User(); // INICIANDO MODELO DO USUÁRIO 
        $userdb = $type == AccountType::ARTIST ? new ArtistDB($user) : ($type == AccountType::ENTERPRISE ? new EnterpriseDB($user) : null);
        //REALIZA A INICIALIZAÇÃO DO BANCO A PARTIR DA VERIFICAÇÃO DO TIPO DE CONTA
        $user->setID($id); // PASSA O ID DO USUARIO PARA O MODELO

        // VERIFICA SE O USERDB É NULO, E VERIFICA SE A COLUNA ESCOLHIDA PARA ALTERAÇÃO REALMENTE EXISTE NA TABELA ESCOLHIDA 
        if (isset($userdb) && $userdb->isColumn(UsersDB::class, $column) && $this->validator->isValidToFlag($column, $info)) {
            return $userdb->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }

    /**
     * Deleta usuário
     * @return true caso o usuário tenha sido deletado
     */
    public function deleteUser(): bool
    {
        $id = $this->parameters->get('id'); //RECEBE O ID

        if (isset($id)) { // Executa se o id foi informado
            $user = new User(); //MODELO DE USUÁRIO
            $user->setID($id); //PASSA O ID DE USUÁRIO PARA O MODELO

            $db = new UsersDB($user); //LIGA O BANCO
            return $db->delete(); // RETORNA SE DELETOU OU NÃO
        }

        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }
}

?>