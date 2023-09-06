<?php

namespace App\Controller;

use App\Model\Enumerate\ArtType;
use App\Server;
use App\DAO\ApplicationDB;
use App\Model\Application;
use App\Model\Selection;
use App\DAO\SelectionDB;
use App\Util\DataFormatException;
use App\Util\DataValidator;
use DateTime;

class AgreementController extends \App\Controller\Template\Controller
{

    /**
     * Armazena um contrato
     * @return bool true caso a operação funcione corretamente
     */
    public function storeSelection(): bool
    {

        $selection = new Selection;
        $selection->setOwner($this->parameterList->getString('owner'));
        $selection->setPrice(floatval($this->parameterList->getString('owner')));

        $date = explode(';', $this->parameterList->getString('date'));
        $selection->setDate(
            DateTime::createFromFormat(SelectionDB::USUAL_DATE_FORMAT, $date[0]),
            DateTime::createFromFormat(SelectionDB::USUAL_DATE_FORMAT, $date[1])
        );

        $time = explode(';', $this->parameterList->getString('time'));
        $selection->setDate(
            DateTime::createFromFormat(SelectionDB::USUAL_TIME_FORMAT, $time[0]),
            DateTime::createFromFormat(SelectionDB::USUAL_TIME_FORMAT, $time[1])
        );

        $selection->setArt($this->parameterList->getEnum('art', ArtType::class));

        $db = new SelectionDB($selection);
        return $db->create();

    }

    /**
     * Obtém dados de um contrato em específico
     *  
     */
    public function getSelection(): array
    {
        $selection = new Selection;
        $selection->setID($this->parameterList->getString('id')); // Obtém id informado

        $db = new SelectionDB($selection); // Inicia objeto para manipular o chat
        return $this->filterNulls($db->getSelection()->toArray());

    }

    /**
     * Obtém lista de contratos
     * @return array
     */
    public function getSelectionList(): array
    {

        $offset = intval($this->parameterList->getString('offset')); // Obtém posição de início da leitura
        $limit = intval($this->parameterList->getString('limit')); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }
        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }


        $selection = new Selection;
        $selection->setOwner($this->parameterList->getString('owner'));
        $db = new SelectionDB($selection);
        return array_map(fn($selection) => Selection::getInstanceOf($selection), $db->getList($offset, $limit));
    }

    /**
     * Deleta contrato
     * @return bool true caso a operação funcione corretamente
     */
    public function deleteSelection(): bool
    {
        $selection = new Selection;
        $selection->setID($this->parameterList->getString('id'));

        $db = new SelectionDB($selection);
        return $db->delete();
    }

    public function updateSelection(): bool
    {

        $column = $this->parameterList->getString('column'); // RECEBE A COLUNA QUE SERÁ ALTERADA
        $info = $this->parameterList->getString('info'); // RECEBE A INFORMAÇÃO QUE ELE DESEJA ALTERAR DE ACORDO COM A CONTA EM QUE ESTÁ CADASTRADO O ID

        $selection = new Selection; // INICIANDO MODELO DO USUÁRIO 

        //REALIZA A INICIALIZAÇÃO DO BANCO A PARTIR DA VERIFICAÇÃO DO TIPO DE CONTA
        $selection->setID($this->parameterList->getString('id')); // PASSA O ID DO SELEÇÃO PARA O MODELO

        $validator = new DataValidator;

        if (SelectionDB::isColumn(SelectionDB::class, $column) && $validator->isValidToFlag($info, $column)) {

            $db = new SelectionDB($selection);
            return $db->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }
    public function getApplication(): array
    {
        $application = new Application($this->parameterList->getString('selection'));
        $application->setID($this->parameterList->getString('id')); // Obtém id informado

        $db = new ApplicationDB($application); // Inicia objeto para manipular o chat
        return $this->filterNulls($db->getApplication()->toArray());
    }

    public function storeApplication(): bool
    {
        $application = new Application($this->parameterList->getString('application'));
        $db = new ApplicationDB($application);
        return $db->create();
    }

    public function deleteApplication(): bool
    {
        $application = new Application($this->parameterList->getString('application'));
        $application->setID($this->parameterList->getString('id'));

        $db = new ApplicationDB($application);
        return $db->delete();
    }

    public function updateApplication(): bool
    {

        $column = ($this->parameterList->getString('column')); // RECEBE A COLUNA QUE SERÁ ALTERADA
        $info = ($this->parameterList->getString('info')); // RECEBE A INFORMAÇÃO QUE ELE DESEJA ALTERAR DE ACORDO COM A CONTA EM QUE ESTÁ CADASTRADO O ID

        $application = new Application($this->parameterList->getString('application')); // INICIANDO MODELO DO USUÁRIO 


        //REALIZA A INICIALIZAÇÃO DO BANCO A PARTIR DA VERIFICAÇÃO DO TIPO DE CONTA
        $application->setID($this->parameterList->getString('id')); // PASSA O ID DO SELEÇÃO PARA O MODELO

        $validator = new DataValidator;

        $db = new ApplicationDB($application);
        if ($db->isColumn($db::class, $column) && $validator->isValidToFlag($info, $column)) {
            return $db->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }

}