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
    public function create(): bool
    {

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO chat (id, artist, enterprise) VALUES (UUID(),?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->chat->getArtist());
        $query->bindValue(2, $this->chat->getEnterprise());

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 0, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM chat WHERE artist = ? OR enterprise = ? LIMIT $limit OFFSET $offset");

        $query->bindValue(1, $this->chat->getArtist());
        $query->bindValue(2, $this->chat->getEnterprise());

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($chat) => Chat::getInstanceOf($chat), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
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
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * Este método não deve ser chamado.
     * @throws RuntimeException Caso o método seja executado
     */
    public function update(string $column = null, string $value = null): bool
    {
        throw new RuntimeException('Não há suporte para atualizações na tabela chat');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): bool
    {
        throw new RuntimeException('Não há suporte para deletamentos na tabela chat');
    }
}