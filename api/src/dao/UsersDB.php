<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\User;
use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class UsersDB extends DatabaseAcess
{
    /**
     * Nome da coluna de nome
     * @var string
     */
    public const NAME = 'full_name';

    /**
     * Nome da coluna de senha 
     * @var string
     */
    public const PWD = 'pwd';

    /**
     * Nome da coluna de telefone 
     * @var string
     */
    public const PHONE = 'phone';

    /**
     * Nome da coluna de cpf/cnpj
     * @var string
     */
    public const DOCUMENT_NUMBER = 'document';

    /**
     * Nome da coluna de email
     * @var string
     */
    public const EMAIL = 'email';

    /**
     * Nome da coluna de cep
     * @var string
     */
    public const CEP = 'cep';

    /**
     * Nome da coluna de site
     * @var string
     */
    public const SITE = 'website';


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
    public function create(): int
    {
        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO Users (id, full_name, email, phone, pwd, document, cep) VALUES (?,?,?,?,?,?,?)');

        $this->user->setID($this->getRandomID());

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->user->getID());
        $query->bindValue(2, $this->user->getName());
        $query->bindValue(3, $this->user->getEmail());
        $query->bindValue(4, $this->user->getPhone());
        $query->bindValue(5, $this->user->getPassword());
        $query->bindValue(6, $this->user->getDocumentNumber());
        $query->bindValue(7, $this->user->getCEP());


        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        // Executa se houver alguma falha esperada
        throw new RuntimeException($message ?? 'Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT id, full_name, cep, website FROM Users LIMIT $limit OFFSET $offset");

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($user) => User::getInstanceOf($user), $this->fetchRecord($query));
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
        $query = $this->getConnection()->prepare('SELECT id, full_name, cep, website FROM Users WHERE id = ?');
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
        $query = $this->getConnection()->prepare('SELECT id FROM Users WHERE email = ? ');
        $query->bindValue(1, $this->user->getEmail()); // Substitui a interrogação pelo email passado

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
        $query = $this->getConnection()->prepare('SELECT * FROM Users WHERE id = ?');
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
    public function update(string $column, string $value): int
    {
        if (!static::isColumn($column)) { // Executa se coluna informada não pertencer à tabela
            $message = "\"$column\" não é uma coluna da tabela Users"; // Define mensagem de erro
            goto error; // Pula execução do método
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE Users SET $column = ? WHERE id = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->user->getID());

        if ($query->execute()) { // Executa em caso de sucesso na operação
            return ($query->rowCount()); // Retorna o número de linhas afetadas
        }

        // Executa caso alguma falha esperada aconteça
        error:
        throw new RuntimeException($message ?? 'Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): int
    {
        // Define a query SQL de remoção
        $query = $this->getConnection()->prepare('DELETE FROM Users WHERE id = ?');
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID informado

        if ($query->execute()) { // Executa caso a query seja aceita
            return $query->rowCount(); // Retorna número de linhas apagadas
        }

        throw new RuntimeException('Operação falhou'); // Executa em caso de falha esperada

    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public static function isColumn(string $column): bool
    {
        $columns = [self::NAME, self::PWD, self::DOCUMENT_NUMBER, self::EMAIL, self::CEP, self::SITE, self::PHONE];
        return !is_bool(array_search($column, $columns));
    }
}
