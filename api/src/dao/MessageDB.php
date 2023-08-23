<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\User;
use App\Model\Message;

/**
 * Classe de maniupulação da tabela Messages
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class MessageDB extends DatabaseAcess
{


    /**
     * Modelo de contrato a ser utilizado na manipulação
     * @var Message
     */
    private Message $message;

    /**
     * @param Message $message Modelo de contrato a ser utilizado na manipulação
     * @param User $user Modelo de usuário a ser considerado na manipulação [opcional]
     */
    function __construct(Message $message)
    {
        $this->message = $message;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): int
    {

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO message (chat, sender, content) VALUES (?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->message->getChat());
        $query->bindValue(2, $this->message->getSender());
        $query->bindValue(3, $this->message->getContent());


        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        // Executa se houver alguma falha esperada
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM message WHERE chat = ? LIMIT $limit OFFSET $offset");

        $query->bindValue(1, $this->message->getChat());

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($message) => Message::getInstanceOf($message), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * Obtém modelo de contrato
     * @return Message modelo de contrato
     */
    public function getMessage(): Message
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare('SELECT * FROM message WHERE chat = ? AND send = ? AND shipping_datetime = ?');

        $query->bindValue(1, $this->message->getChat());
        $query->bindValue(2, $this->message->getSender());
        $query->bindValue(3, $this->message->getDatetime());

        if ($query->execute()) { // Executa se a query for aceita
            return Message::getInstanceOf($this->fetchRecord($query, false));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): int
    {
        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE message SET $column = ? WHERE chat = ? AND send = ? AND shipping_datetime = ?");

        // Substitui interrogações pelos valores das variáveis
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->message->getChat());
        $query->bindValue(3, $this->message->getSender());
        $query->bindValue(4, $this->message->getDatetime());

        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): int
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM message WHERE chat = ? AND send = ? AND shipping_datetime = ?');
        $query->bindValue(1, $this->message->getChat());
        $query->bindValue(2, $this->message->getSender());
        $query->bindValue(3, $this->message->getDatetime());

        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        throw new \RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
    }
}
