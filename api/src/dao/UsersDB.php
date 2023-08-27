<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\User;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class UsersDB extends DatabaseAcess
{
    public const EMAIL = 'email';
    public const PASSWORD = 'password';
    public const NAME = 'NAME';
    public const PHONE = 'phone';
    public const CEP = 'CEP';
    public const FEDERATION = 'federation';
    public const CITY = 'city';
    public const SITE = 'website';
    public const IMAGE_URL = 'image_url';
    public const RATE = 'rate';

    /**
     * @param User $user Modelo de usuário a ser manipulado
     */
    function __construct(User $user = null)
    {
        $this->user = $user;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): bool
    {
        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO users (id, name, image_url, email, password, phone, CEP, federation, city) VALUES (?,?,?,?,?,?,?,?,?)');

        $this->user->setID($this->getRandomID());

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->user->getID());
        $query->bindValue(2, $this->user->getName());
        $query->bindValue(3, $this->user->getImageURL());
        $query->bindValue(4, $this->user->getEmail());
        $query->bindValue(5, $this->user->getPassword());
        $query->bindValue(6, $this->user->getPhone());
        $query->bindValue(7, $this->user->getCEP());
        $query->bindValue(8, $this->user->getFederation());
        $query->bindValue(9, $this->user->getCity());


        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT id, name, image_url, CEP, federation, city, rate, website FROM users LIMIT $limit OFFSET $offset");

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($user) => User::getInstanceOf($user), $this->fetchRecord($query));
        }
        throw new RuntimeException('Operação falhou!'); // Executa se alguma falha esperdada ocorrer
    }

    /**
     * Obtém modelo de Usuário com dados não sensíveis
     * @return User Modelo de usuário
     */
    public function getUnique(string $id): User
    {
        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT id, name, image_url, CEP, federation, city, rate, website FROM users WHERE id = ?');
        $query->bindValue(1, $id); // Substitui interrogação pelo ID

        if ($query->execute()) { // Executa se a query for aceita
            return User::getInstanceOf($this->fetchRecord($query, false));
        }
        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getID(): array
    {
        // Passa query SQL para leitura da coluna id
        $query = $this->getConnection()->prepare('SELECT id FROM users WHERE email = ? AND password = ?');

        // // Substitui as interrogações
        $query->bindValue(1, $this->user->getEmail());
        $query->bindValue(1, $this->user->getPassword());

        if ($query->execute()) { // Executa se a query for aceita
            return $this->fetchRecord($query, false);
        }

        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * Obtém modelo de Usuário com todos os dados disponíveis
     * @return User Modelo de usuário
     */
    public function getUser(): User
    {

        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT * FROM users WHERE id = ?');
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID

        if ($query->execute()) { // Executa se a query for aceita
            return User::getInstanceOf($this->fetchRecord($query, false));
        }
        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): bool
    {

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE users SET $column = ? WHERE id = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->user->getID());

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): bool
    {
        // Define a query SQL de remoção
        $query = $this->getConnection()->prepare('DELETE FROM users WHERE id = ?');
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID informado

        return $query->execute();
    }
}
