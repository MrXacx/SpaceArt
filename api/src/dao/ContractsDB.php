<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Contract;
use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Contracts
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class ContractsDB extends DatabaseAcess
{
    /**
     * Nome da coluna de contratante
     * @var string
     */
    public const HIRER_ID = 'hirer';

    /**
     * Nome da coluna de contratado
     * @var string
     */
    public const HIRED_ID = 'hired';

    /**
     * Nome da coluna de valor de contrato
     * @var string
     */
    public const PRICE = 'price';

    /**
     * Nome da coluna de tipo de arte
     * @var string
     */
    public const ART = 'art';

    /**
     * Nome da coluna de data do evento
     * @var string
     */
    public const DATE = 'date_point';

    /**
     * Nome da coluna de horário de início
     * @var string
     */
    public const INITAL_TIME = 'inital_time';

    /**
     * Nome da coluna de horário de fim
     * @var string
     */
    public const FINAL_TIME = 'final_time';

    /**
     * Nome da coluna de status do contrato
     * @var string
     */
    public const LOCKED = 'locked';

    /**
     * Nome da coluna de status da solicitação de contrato
     * @var string
     */
    public const ACCEPTED = 'accepted';

    /**
     * Modelo de contrato a ser utilizado na manipulação
     * @var Contract
     */
    private Contract $contract;

    /**
     * @param Contract $contract Modelo de contrato a ser utilizado na manipulação
     * @param User #user Modelo de usuário a ser considerado na manipulação [opcional]
     */
    function __construct(Contract $contract, \App\Model\User $user = null)
    {
        $this->contract = $contract;
        $this->user = $user;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): int
    {
        $this->contract->setID($this->getRandomID()); // Gera uuid

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO Contracts (id, hirer, hired, price, date_point, inital_time, final_time, art) VALUES (?,?,?,?,?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->contract->getID());
        $query->bindValue(2, $this->contract->getHirerID());
        $query->bindValue(3, $this->contract->getHiredID());
        $query->bindValue(4, $this->contract->getPrice());
        $query->bindValue(5,  $this->contract->getDate());

        $time = $this->contract->getTime();
        $query->bindValue(6, $time['inital']);
        $query->bindValue(7, $time['final']);
        $query->bindValue(8, $this->contract->getArt());

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
        $query = $this->getConnection()->prepare("SELECT id, hirer, hired, price, date_point FROM Contracts WHERE hirer = ? OR hired = ? ORDER BY ABS(DATEDIFF(date_point, CURDATE())) LIMIT $limit OFFSET $offset");

        $id = $this->user->getID();
        $query->bindValue(1, $id);
        $query->bindValue(2, $id);

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($contract) => Contract::getInstanceOf($contract), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException($message ?? 'Operação falhou!');
    }

    /**
     * Obtém modelo de contrato
     * @return Contract modelo de contrato
     */
    public function getContract(): Contract
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare('SELECT * FROM Contracts WHERE id = ?');
        $query->bindValue(1, $this->contract->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se a query for aceita
            return Contract::getInstanceOf($this->fetchRecord($query, false));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): int
    {
        if (!static::isColumn($column)) { // Executa se coluna informada não pertencer à tabela
            $message = "\"$column\" não é uma coluna da tabela Contracts"; // Define mensagem de erro
            goto error; // Pula execução do método
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE Contracts SET $column = ? WHERE id = ?");

        // Substitui interrogações pelos valores das variáveis
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->contract->getID());

        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        // Executa em caso de falhas esperadas
        error: throw new \RuntimeException($message ?? 'Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): int
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM Contracts WHERE id = ?');
        $query->bindValue(1, $this->contract->getID());
        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        throw new \RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
    }

    /**
     * Confere se valor é idêntico ao nome de alguma coluna da tabela
     * 
     * @param string Nome da coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column): bool
    {
        $columns = [static::HIRER_ID, static::HIRED_ID, static::PRICE, static::ART, static::DATE, static::INITAL_TIME, static::FINAL_TIME];
        return !is_bool(array_search($column, $columns));
    }
}
