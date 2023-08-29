<?php

namespace App\Controller;

use App\Server;
use App\DAO\ChatDB;
use App\Model\Chat;

class UserController
{
    private \Symfony\Component\HttpFoundation\ParameterBag $parameterList;

    function __construct()
    {
        $this->parameterList = Server::getParameterList();
    }

    private function removeNullValues(array $arr): array
    {
        return array_filter($arr, fn ($value) => isset($value));
    }

    /**
     * Obtém dados de um chat em específico
     * @return array Todos os dados de um chat em específico
     */
    public function getChat(): array
    {          
        $chat = new Chat();
        $chat->setID($this->parameterList->getString('id')); // Obtém id informado

        $db = new ChatDB($chat); // Inicia objeto para manipular o chat
        return $this->removeNullValues($db->getChat()->toArray())();
        
    }

    /**
     * Obtém lista de chats
     * @return array
     */
    public function getChatList(): array
    {

        $offset = intval($this->parameterList->getString('offset')); // Obtém posição de início da leitura
        $limit = intval($this->parameterList->getString('limit')); // Obtém máximo de elementos da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }
        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $offset = Server::DEFAULT_LIMIT;
        }


        $chat = new Chat();
        $person = $this->parameterList->getString('person');
        $chat->setEnterprise($person);
        $chat->setArtist($person);

        $db = new ChatDB($chat);
        $list = $db->getList($offset, $limit);
        return  array_map(fn ($user) => $this->removeNullValues($user->toArray()), $list);
    }

    /**
     * Armazena um chat
     * @return bool true caso a operação funcione corretamente
     */
    public function storeChat(): bool{

        $chat = new Chat();
        $chat->setArtist($this->parameterList->getString('artist'));
        $chat->setEnterprise($this->parameterList->getString('enterprise'));

        $db = new ChatDB($chat);
        return $db->create();

    }

    /**
     * Deleta chat
     * @return bool true caso a operação funcione corretamente
     */
    public function deleteChat(): bool
    {
        $chat = new Chat();
        $chat->setID($this->parameterList->getString('id'));

        $db = new ChatDB($chat);
        return $db->delete();
    }
}
