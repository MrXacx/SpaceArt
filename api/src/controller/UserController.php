<?php

namespace App\Controller;

use App\Server;
use App\DAO\UsersDB;
use App\DAO\ArtistDB;
use App\DAO\EnterpriseDB;
use App\DAO\ReportDB;
use App\Model\Template\User;
use App\Model\Artist;
use App\Model\Enterprise;
use App\Model\Enumerate\AccountType;
use App\Model\Enumerate\ArtType;
use App\Model\Report;
use App\Util\DataFormmatException;
use App\Util\DataValidator;
use RuntimeException;

class UserController extends \App\Controller\Template\Controller
{

    /**
     * Remove registros nulos de um vetor
     * @param array $arr vetor a ser lido
     * @return array vetor limpo
     */


    /**
     * Obtém usuário
     * @return array dados de um usuário
     */
    public function getUser(): array
    {

        list($user, $db) = $this->getAccountType();
        $user->setID($this->parameterList->getString('id')); // Inicia usuário com o id informado

        return $this->filterNulls($db->getUser()->toArray())();

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

        $user = new User();

        $user->setEmail($this->parameterList->getString('email'));
        $user->setPassword($this->parameterList->getString('password'));

        $db = new UsersDB($user);
        return $db->getID();

    }

    /**
     * Obtém lista de usuários
     * @return array
     */
    public function getUserList(): array
    {

        $type = $this->parameterList->getString('type'); // Obtém tipo da conta
        $offset = intval($this->parameterList->getString('offset')); // Obtém posição de início da leitura
        $limit = intval($this->parameterList->getString('limit')); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }

        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }

        $dao = match ($type) { //Obtém objeto adequado para o tipo de conta
            AccountType::ARTIST->value => new ArtistDB(),
            AccountType::ENTERPRISE->value => new EnterpriseDB(),
            default => throw new RuntimeException('O tipo da conta não foi informado ou não foi reconhecido') // Lança exceção
        };

        $list = $dao->getList($offset, $limit);
        return array_map(fn($user) => $this->filterNulls($user->toArray()), $list);
    }

    /**
     * Armazena usuário
     * @return true caso o usuário seja criado
     */
    public function storeUser(): bool
    {


        if ($this->parameterList->getString('type') == AccountType::ARTIST) {
            $user = new Artist();

            $this->createGeneralUser($user);

            $user->setCPF($this->parameterList->getString('cpf'));
            $user->setArt(ArtType::tryFrom($this->parameterList->getString('art')));
            $user->setWage($this->parameterList->get('wage'));

            $db = new ArtistDB($user);
        } else if ($this->parameterList->getString('type') == AccountType::ENTERPRISE) {
            $user = new Enterprise();

            $this->createGeneralUser($user);

            $user->setCNPJ($this->parameterList->getString('cnpj'));
            $user->setDistrict($this->parameterList->getString('district'));
            $user->setAddress($this->parameterList->getString('address'));

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
        $name = $this->parameterList->getString('name');
        $email = $this->parameterList->getString('email');
        $password = $this->parameterList->getString('password');
        $phone = $this->parameterList->getString('phone');
        $cep = $this->parameterList->getString('cep');
        $federation = $this->parameterList->getString('federation');
        $city = $this->parameterList->getString('city');


        $user->setName($name);
        $user->setEmail($email);
        $user->setPassword($password);
        $user->setPhone($phone);
        $user->setCEP($cep);
        $user->setFederation($federation);
        $user->setCity($city);
    }

    /**
     * Obtém tipo de conta informado
     * @return array instância do modelo e do banco do tipo informado
     */
    private function getAccountType(): array
    {
        return match ($this->parameterList->getString('type')) { // RECEBENDO O TIPO DA CONTA

            AccountType::ARTIST->value => [$artist = new Artist(), new ArtistDB($artist)],
            AccountType::ENTERPRISE->value => [$enterprise = new Enterprise(), new EnterpriseDB($enterprise)],
            default => throw new DataFormmatException('Account type')
        };
    }

    /**
     * Atualiza atributo do usuário
     * @return true caso o dado tenha sido atualizado
     */
    public function updateUser(): bool
    {

        $column = ($this->parameterList->getString('column')); // RECEBE A COLUNA QUE SERÁ ALTERADA
        $info = ($this->parameterList->getString('info')); // RECEBE A INFORMAÇÃO QUE ELE DESEJA ALTERAR DE ACORDO COM A CONTA EM QUE ESTÁ CADASTRADO O ID

        $user = new User(); // INICIANDO MODELO DO USUÁRIO 

        list($user, $db) = $this->getAccountType();

        //REALIZA A INICIALIZAÇÃO DO BANCO A PARTIR DA VERIFICAÇÃO DO TIPO DE CONTA
        $user->setID($this->parameterList->getString('id')); // PASSA O ID DO USUARIO PARA O MODELO

        $validator = new DataValidator();

        
        if ($db->isColumn($db::class, $column) && $validator->isValidToFlag($info, $column)) {
            return $db->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }

    /**
     * Deleta usuário
     * @return true caso o usuário tenha sido deletado
     */
    public function deleteUser(): bool
    {

        $user = new User(); //MODELO DE USUÁRIO
        $user->setID($this->parameterList->getString('id')); //PASSA O ID DE USUÁRIO PARA O MODELO

        $db = new UsersDB($user); //LIGA O BANCO
        return $db->delete(); // RETORNA SE DELETOU OU NÃO

    }

    /**
     * Obtém denúncia de um usuário
     * @return array todos os dados da denúncia
     */
    public function getReport(): array
    {
        $report = new Report($this->parameterList->getString('reporter'));
        $report->setID($this->parameterList->getString('id'));

        $db = new ReportDB($report);
        return $db->getReport()->toArray();
    }

    /**
     * Obtém lista de denúncias
     * @return array lista com dados das denúncias de um usuário
     */
    public function getReportList(): array
    {
        $db = new ReportDB(new Report($this->parameterList->getString('reporter')));
        return array_map(fn($report) => $report->toArray(), $db->getList());
    }

    /**
     * Armazena denúncia
     * @return bool true se a denúncia foi armazenada
     */
    public function storeReport(): bool
    {
        $report = new Report($this->parameterList->getString('reporter'));
        $report->setReported($this->parameterList->getString('reported'));
        $report->setReason($this->parameterList->getString('reason'));

        $db = new ReportDB($report);
        return $db->create();
    }

}