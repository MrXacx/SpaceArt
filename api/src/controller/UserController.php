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
use App\Util\DataFormatException;
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

        // Caso o id seja o token de acesso, dados sigilosos serão consultados
        return $this->filterNulls($this->parameterList->getBoolean('token') ? $db->getUser()->toArray() : $db->getUnique()->toArray());

    }

    /**
     * Obtém dados de acesso ao sistema
     * @return array vetor com dados de acesso
     */
    public function getUserAcess(): array
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
        $db->updateTokenAcess();
        return $db->getAcess();

    }

    /**
     * Obtém lista de usuários
     * @return array
     */
    public function getUserList(): array
    {


        $offset = intval($this->parameterList->getInt('offset')); // Obtém posição de início da leitura
        $limit = intval($this->parameterList->getInt('limit', 10)); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }

        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }

        list($user, $dao) = $this->getAccountType();;

        $list = $dao->getList($offset, $limit);
        return array_map(fn($user) => $this->filterNulls($user->toArray()), $list);
    }

    /**
     * Armazena usuário
     * @return// true caso o usuário seja criado
     */
    public function storeUser()
    {
        $user = false;
        $db = false;

        $a = 'nao foi';

        switch ($this->parameterList->getEnum('type', AccountType::class)) {
            case AccountType::ARTIST:

                $user = new Artist();

                $user->setCPF($this->parameterList->getString('cpf'));
                $user->setArt(ArtType::tryFrom($this->parameterList->getString('art')));
                $user->setWage($this->parameterList->get('wage'));
                $db = new ArtistDB($user);

                break;

            case AccountType::ENTERPRISE:
                $user = new Enterprise();
                $user->setCNPJ($this->parameterList->getString('cnpj'));
                $user->setDistrict($this->parameterList->getString('district'));
                $user->setAddress($this->parameterList->getString('address'));
                $db = new EnterpriseDB($user);
                break;

            case null: throw new DataFormatException('TYPE ACCOUNT');
        }

        if ($user instanceof User && $db instanceof UsersDB) {
 
            $user->setName($this->parameterList->getString('name'));
            $user->setEmail($this->parameterList->getString('email'));
            $user->setPassword($this->parameterList->getString('password'));
            $user->setPhone($this->parameterList->getString('phone'));
            $user->setCEP($this->parameterList->getString('cep'));
            $user->setFederation($this->parameterList->getString('federation'));
            $user->setCity($this->parameterList->getString('city'));
            $user->setImageURL($this->parameterList->getString('image'));
            
            return $db->create();
        }
       

        return false;

    }


    /**
     * Obtém tipo de conta informado
     * @return array instância do modelo e do banco do tipo informado
     */
    private function getAccountType(): array
    {
        return match ($this->parameterList->getEnum('type', AccountType::class)) { // RECEBENDO O TIPO DA CONTA

            AccountType::ARTIST => [$artist = new Artist(), new ArtistDB($artist)],
            AccountType::ENTERPRISE => [$enterprise = new Enterprise(), new EnterpriseDB($enterprise)],
            default => throw new DataFormatException('Account Type')
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