<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Agreement;
use App\Model\Template\User;

/**
 * Classe de maniupulação da tabela Agreements
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class AgreementDB extends DatabaseAcess
{

    public const HIRER = 'hirer';
    public const HIRED = 'hired';
    public const PRICE = 'price';
    public const ART = 'art';
    public const DATE = 'date';
    public const INITAL_TIME = 'inital_time';
    public const FINAL_TIME = 'final_time';
    public const STATUS = 'status';

    /**
     * Modelo de contrato a ser utilizado na manipulação
     * @var Agreement
     */
    private Agreement $agreement;

    /**
     * @param Agreement $agreement Modelo de contrato a ser utilizado na manipulação
     * @param User #user Modelo de usuário a ser considerado na manipulação [opcional]
     */
    function __construct(Agreement $agreement, User $user = null)
    {
        $this->agreement = $agreement;
        $this->user = $user;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): bool
    {

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO agreement (id, hirer, hired, price, date, inital_time, final_time, art) VALUES (UUID(),?,?,?,?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->agreement->getHirer());
        $query->bindValue(2, $this->agreement->getHired());
        $query->bindValue(3, $this->agreement->getPrice());
        $query->bindValue(4, $this->agreement->getDate()->format(DatabaseAcess::DB_DATE_FORMAT));

        $time = $this->agreement->getTime();
        $query->bindValue(5, $time['inital']);
        $query->bindValue(6, $time['final']);
        $query->bindValue(7, $this->agreement->getArt()->value);

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 0, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT id, hirer, hired, price, date FROM agreement WHERE hirer = ? OR hired = ? ORDER BY ABS(DATEDIFF(date, CURDATE())) LIMIT $limit OFFSET $offset");


        $query->bindValue(1, $this->agreement->gethirer());
        $query->bindValue(2, $this->agreement->gethired());

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($agreement) => Agreement::getInstanceOf($agreement), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * Obtém modelo de contrato
     * @return Agreement modelo de contrato
     */
    public function getAgreement(): Agreement
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare('SELECT * FROM agreement WHERE id = ?');
        $query->bindValue(1, $this->agreement->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se a query for aceita
            return Agreement::getInstanceOf($this->fetchRecord($query, false));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): bool
    {
        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE agreement SET $column = ? WHERE id = ?");

        // Substitui interrogações pelos valores das variáveis
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->agreement->getID());

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): bool
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM agreement WHERE id = ?');
        $query->bindValue(1, $this->agreement->getID());
        return $query->execute();
    }
}