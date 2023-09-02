<?php

namespace App\Controller;

use App\Model\Enumerate\ArtType;
use App\Server;
use App\DAO\AgreementDB;
use App\Model\Agreement;
use App\Model\Rate;
use App\DAO\RateDB;
use App\Util\DataFormmatException;
use App\Util\DataValidator;
use DateTime;

class UserController extends \App\Controller\Template\Controller
{


    /**
     * Obtém dados de um contrato em específico
     * @return array Todos os dados de um chat em específico
     */
    public function getAgreement(): array
    {
        $agreement = new Agreement();
        $agreement->setID($this->parameterList->getString('id')); // Obtém id informado

        $db = new AgreementDB($agreement); // Inicia objeto para manipular o chat
        return $this->filterNulls($db->getAgreement()->toArray());

    }

    /**
     * Obtém lista de contratos
     * @return array
     */
    public function getAgreementList(): array
    {

        $offset = intval($this->parameterList->getString('offset')); // Obtém posição de início da leitura
        $limit = intval($this->parameterList->getString('limit')); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }
        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }


        $agreement = new Agreement();
        $db = new AgreementDB($agreement);
        return array_map(fn($agreement) => Agreement::getInstanceOf($agreement), $db->getList($offset, $limit));
    }

    /**
     * Armazena um contrato
     * @return bool true caso a operação funcione corretamente
     */
    public function storeAgreement(): bool
    {

        $agreement = new Agreement(); // Inicia modelo

        $agreement->setHirer($this->parameterList->getString('hirer')); // obtém id do contratante
        $agreement->setHired($this->parameterList->getString('hired')); // obtém id do contratado
        $agreement->setArt($this->parameterList->getEnum('art', ArtType::class)); // obtém tipo de arte
        $agreement->setDate(DateTime::createFromFormat(AgreementDB::USUAL_DATE_FORMAT, $this->parameterList->getString('date'))); // obtém data do evento
        $agreement->setTime(
            // obtém horários de início e fim do evento
            DateTime::createFromFormat(AgreementDB::DB_TIME_FORMAT, $this->parameterList->getString('inital_time')),
            DateTime::createFromFormat(AgreementDB::DB_TIME_FORMAT, $this->parameterList->getString('final_time'))
        );

        $db = new AgreementDB($agreement); // inicia banco com modelo de contrato
        return $db->create(); // armazena registro

    }

    /**
     * Deleta contrato
     * @return bool true caso a operação funcione corretamente
     */
    public function deleteAgreement(): bool
    {
        $agreement = new Agreement();
        $agreement->setID($this->parameterList->getString('id')); // obtém id do contrato

        $db = new AgreementDB($agreement); // inicia banco com modelo de contrato
        return $db->delete(); // deleta contrato
    }

    public function updateAgreement(): bool
    {

        $column = ($this->parameterList->getString('column')); // RECEBE A COLUNA QUE SERÁ ALTERADA
        $info = ($this->parameterList->getString('info')); // RECEBE A INFORMAÇÃO QUE ELE DESEJA ALTERAR DE ACORDO COM A CONTA EM QUE ESTÁ CADASTRADO O ID

        $agreement = new Agreement(); // INICIANDO MODELO DO CONTRATO 

        $agreement->setID($this->parameterList->getString('id')); // PASSA O ID DO CONTRATO PARA O MODELO

        $validator = new DataValidator();

        $db = new AgreementDB($agreement);
        if ($db->isColumn($db::class, $column) && $validator->isValidToFlag($info, $column)) {
            return $db->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }
    public function getRate(): array
    {
        $rate = new Rate($this->parameterList->getString('agreement'));
        $rate->setID($this->parameterList->getString('id')); // Obtém id informado

        $db = new RateDB($rate); // Inicia objeto para manipular o chat
        return $this->filterNulls($db->getRate()->toArray());

    }
    public function storeRate(): bool
    {
        $rate = new Rate($this->parameterList->getString('agreement')); // inicia modelo de avaliação
        $rate->setAuthor($this->parameterList->getString('author')); // obtém autor
        $rate->setDescription($this->parameterList->getString('description')); // obtém descrição da avaliação
        $rate->setRate(floatval($this->parameterList->getString('rate'))); // obtém nota

        $db = new RateDB($rate); // inicia banco
        return $db->create(); // armazena avaliação
    }

    public function deleteRate(): bool
    {
        $rate = new Rate($this->parameterList->getString('agreement')); // inicia modelo de avaliação
        $rate->setID($this->parameterList->getString('id')); // obtém id da avaliação

        $db = new RateDB($rate); // inicia banco
        return $db->delete(); // deleta avaliação
    }

    public function updateRate(): bool
    {

        $column = ($this->parameterList->getString('column')); // RECEBE A COLUNA QUE SERÁ ALTERADA
        $info = $this->parameterList->getString('info'); // RECEBE A INFORMAÇÃO QUE ELE DESEJA ALTERAR DE ACORDO COM A CONTA EM QUE ESTÁ CADASTRADO O ID

        $rate = new Rate($this->parameterList->getString('agreement')); // INICIANDO MODELO DO USUÁRIO 
        $rate->setID($this->parameterList->getString('id')); // PASSA O ID DO CONTRATO PARA O MODELO

        $validator = new DataValidator();

        $db = new RateDB($rate);

        if ($db->isColumn($db::class, $column) && $validator->isValidToFlag($info, $column)) {
            return $db->update($column, $info); //RETORNA SE ALTEROU OU NÃO, DE ACORDO COM A VERIFICAÇÃO DO IF
        }
        return false; // RETORNA FALSO CASO NÃO TENHA PASSADO DA VERIFICAÇÃO
    }

}