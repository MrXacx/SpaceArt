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

class SelectionController extends \App\Controller\Template\Controller
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
        $selection->setTime(
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

        $offset = $this->parameterList->getInt('offset'); // Obtém posição de início da leitura
        $limit = $this->parameterList->getInt('limit'); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }
        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }


        $selection = new Selection;
        $selection->setOwner($this->parameterList->getString('owner'));
        $db = new SelectionDB($selection);
        return array_map(fn($selection) => $selection->toArray(), $db->getList($offset, $limit));
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

            if ($column == SelectionDB::INITAL_DATETIME || $column == SelectionDB::FINAL_DATETIME) {
                $timestamp = DateTime::createFromFormat(
                    SelectionDB::USUAL_TIMESTAMP_FORMAT,
                    $info
                );

                if (is_bool($timestamp)) {
                    goto failed;
                }

                $info = $timestamp->format(SelectionDB::DB_TIMESTAMP_FORMAT);
            }

            $db = new SelectionDB($selection);
            return $db->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }

        failed:
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }
    public function getApplication(): array
    {
        $application = new Application($this->parameterList->getString('selection'));
        $application->setUser($this->parameterList->getString('artist')); // Obtém id informado

        $db = new ApplicationDB($application); // Inicia objeto para manipular o chat
        return $this->filterNulls($db->getApplication()->toArray());
    }

    public function storeApplication(): bool
    {
        $application = new Application($this->parameterList->getString('selection'));
        $application->setUser($this->parameterList->getString('artist'));

        $db = new ApplicationDB($application);
        return $db->create();
    }

    /**
     * Obtém lista de aplicações a uma seleção
     * @return array
     */
    public function getApplicationList(): array
    {

        $offset = $this->parameterList->getInt('offset'); // Obtém posição de início da leitura
        $limit = $this->parameterList->getInt('limit'); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }
        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $limit = Server::DEFAULT_LIMIT;
        }


        $db = new ApplicationDB(
            new Application($this->parameterList->getString('selection'))
        );

        return array_map(fn($application) => $application->toArray(), $db->getList($offset, $limit));
    }

    public function deleteApplication(): bool
    {
        $application = new Application($this->parameterList->getString('selection'));
        $application->setUser($this->parameterList->getString('artist'));

        $db = new ApplicationDB($application);
        return $db->delete();
    }
}