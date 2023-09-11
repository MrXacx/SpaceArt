<?php

namespace App\Controller;

use App\Model\Enumerate\ArtType;

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
     * Obtém lista aleatória de seleções filtrada pelo tipo de arte
     * 
     * @param Selection $selection Modelo de seleção
     * @param SelectionDB $db Classe de conexão
     * @param int $limit Quantidade máxima de itens da lista
     * @return array<Selection> Lista de seleções
     */
    private function getRandomSelectionListByArt(Selection $selection, SelectionDB $db, int $limit): array
    {
        $selection->setArt($this->parameterList->getEnum('art', ArtType::class));
        return $db->getList(0, $limit);
    }

    /**
     * Obtém lista aleatória de seleções filtrada pelo tipo de arte
     * 
     * @param Selection $selection Modelo de seleção
     * @param SelectionDB $db Classe de conexão
     * @param int $offset Linha inicial da consulta
     * @param int $limit Quantidade máxima de itens da lista
     * @return array<Selection> Lista de seleções
     */
    private function getSelectionListByOwner(Selection $selection, SelectionDB $db, int $offset, int $limit): array
    {
        $selection->setOwner($this->parameterList->getString('owner'));
        return $db->getListOfOwner($offset, $limit);
    }


    /**
     * Obtém lista de contratos
     * @return array
     */
    public function getSelectionList(): array
    {
        $offset = $this->fetchListOffset(); // Obtém posição de início da leitura
        $limit = $this->fetchListLimit(); // Obtém máximo de elementos da leitura


        $selection = new Selection;
        $db = new SelectionDB($selection);


        $list = match ($this->parameterList->getString('filter')) {
            default => $this->getRandomSelectionListByArt(
                $selection,
                $db,
                $limit
            ),
            'owner' => $this->getSelectionListByOwner(
                $selection,
                $db,
                $offset,
                $limit
            )
        };

        return array_map(fn($selection) => $selection->toArray(), $list);
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

            if ($column == SelectionDB::START_TIMESTAMP || $column == SelectionDB::END_TIMESTAMP) {
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

        $offset = $this->fetchListOffset(); // Obtém posição de início da leitura
        $limit = $this->fetchListLimit(); // Obtém máximo de elementos da leitura


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