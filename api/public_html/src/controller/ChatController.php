<?php

declare(strict_types=1);

namespace App\Controller;

use App\DAO\ChatDB;
use App\DAO\MessageDB;
use App\Model\Chat;
use App\Model\Message;

/**
 * Controlador de chat e mensagens
 * 
 * @package Controller
 * @author Ariel Santos <MrXacx>
 * @author Marcos Vinícius <>
 * @author Matheus Silva <>
 */
final class ChatController
{
    use \App\Controller\Tool\Controller;

    /**
     * Armazena um chat
     * @return bool true caso a operação funcione corretamente
     */
    public function storeChat(): bool
    {

        $chat = new Chat;
        $chat->setArtist($this->parameterList->getString('artist'));
        $chat->setEnterprise($this->parameterList->getString('enterprise'));

        $db = new ChatDB($chat);
        return $db->create();

    }

    /**
     * Obtém dados de um chat em específico
     * @return array Todos os dados de um chat em específico
     */
    public function getChat(): array
    {
        $chat = new Chat;
        $chat->setID($this->parameterList->getString('id'));
        $chat->setArtist($this->parameterList->getString('artist')); // Obtém id do artista
        $chat->setEnterprise($this->parameterList->getString('enterprise')); // Obtém id do empreedimento

        $db = new ChatDB($chat); // Inicia objeto para manipular o chat
        return $this->filterNulls($db->getChat()->toArray());

    }

    /**
     * Obtém lista de chats
     * @return array
     */
    public function getChatList(): array
    {

        $offset = $this->fetchListOffset(); // Obtém posição de início da leitura
        $limit = $this->fetchListLimit(); // Obtém máximo de elementos da leitura


        $chat = new Chat;
        $user = $this->parameterList->getString('user');
        $chat->setEnterprise($user);
        $chat->setArtist($user);

        $db = new ChatDB($chat);
        $list = $db->getList($offset, $limit);
        return array_map(fn($user) => $this->filterNulls($user->toArray()), $list);
    }

    /**
     * Armazena uma mensagem
     * @return bool true caso a operação funcione corretamente
     */
    public function storeMessage(): bool
    {

        $message = new Message($this->parameterList->getString('chat'));
        $message->setSender($this->parameterList->getString('sender'));
        $message->setContent($this->parameterList->getString('content'));
        $message->setTimestamp(new \DateTime());

        $db = new MessageDB($message);
        return $db->create();

    }

    /**
     * Obtém dados de uma mensagem
     * @return array Todos os dados da mensagem
     */
    public function getMessage(): array
    {

        $message = new Message($this->parameterList->getString('chat'));
        $message->setSender($this->parameterList->getString('sender'));
        $message->setTimestamp(
            \DateTime::createFromFormat(
                'd/m/Y H:i:s',
                $this->parameterList->getString('timestamp')
            )
        );

        $db = new MessageDB($message);
        return $db->getMessage()->toArray();

    }

    /**
     * Obtém lista de mensagens de um chat
     * @return array
     */
    public function getMessageList(): array
    {

        $offset = $this->fetchListOffset(); // Obtém posição de início da leitura
        $limit = $this->fetchListLimit(); // Obtém máximo de elementos da leitura

        $message = new Message($this->parameterList->getString('chat'));

        $list = (new MessageDB($message))->getList($offset, $limit);
        return array_map(fn($user) => $this->filterNulls($user->toArray()), $list);
    } 

    /**
     * Deleta chat
     * @return bool true caso a operação funcione corretamente
     */
    public function deleteMessage(): bool
    {
        $message = new Message($this->parameterList->getString('chat'));
        $message->setSender($this->parameterList->getString('sender'));
        $message->setTimestamp(
            \DateTime::createFromFormat(
                'd/m/Y H:i:s',
                $this->parameterList->getString('timestamp')
            )
        );

        $db = new MessageDB($message);
        return $db->delete();
    }

}

?>