<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Chat;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Chats
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class ChatDB extends DatabaseAcess
{
    public const ARTIST = 'artist';
    public const ENTERPRISE = 'enterprise';

    /**
     * Modelo de candidatura a ser manipulado
     * @var Chat
     */
    private Chat $chat;

    /**
     * @param Chat $chat Modelo de candidatura a ser manipulado
     */
    function __construct(Chat $chat)
    {
        $this->chat = $chat;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): int
    {

        $this->chat->setID($this->getRandomID()); // Gera uuid

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO chat (id, artist, enterprise) VALUES (?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->chat->getID());
        $query->bindValue(2, $this->chat->getArtist());
        $query->bindValue(3, $this->chat->getEnterprise());

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
        $query = $this->getConnection()->prepare("SELECT * FROM chat WHERE artist = ? OR enterprise = ? LIMIT $limit OFFSET $offset");

        $id = $this->chat->getID();
        $query->bindValue(1, $id);
        $query->bindValue(2, $id);

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($chat) => Chat::getInstanceOf($chat), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    public function getChat(): Chat
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM chat WHERE id = ?");
        $query->bindValue(1, $this->chat->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return Chat::getInstanceOf($this->fetchRecord($query, false));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * Este método não deve ser chamado.
     * @throws RuntimeException Caso o método seja executado
     */
    public function update(string $column = null, string $value = null): int
    {
        throw new RuntimeException('Não há suporte para atualizações na tabela chat');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): int
    {
        // Deleta candidatura do banco
        $query = $this->getConnection()->prepare('DELETE FROM chat WHERE id = ?');

        $query->bindValue(1, $this->chat->getID());

        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        throw new \RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
    }
}
