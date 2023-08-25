<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Agreement;
use App\Model\Rate;

/**
 * Classe de maniupulação da tabela Rates
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class RateDB extends DatabaseAcess
{
    public const AUTHOR = 'author';
    public const AGREEMENT = 'agreement';
    public const RATE = 'rate';
    public const DESCRIPTION = 'description';

    /**
     * Modelo de contrato a ser utilizado na manipulação
     * @var Rate
     */
    private Rate $rate;

    private Agreement $agreement;

    /**
     * @param Rate $rate Modelo de contrato a ser utilizado na manipulação
     * @param Agreement $agreement Modelo de usuário a ser considerado na manipulação [opcional]
     */
    function __construct(Rate $rate, Agreement $agreement = null)
    {
        $this->rate = $rate;
        $this->agreement = $agreement;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): bool
    {

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO rate (author, agreement, rate, description) VALUES (?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->rate->getAuthor());
        $query->bindValue(2, $this->rate->getAgreement());
        $query->bindValue(3, $this->rate->getRate());
        $query->bindValue(4, $this->rate->getDescription());

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM rate WHERE agreement = ? LIMIT $limit OFFSET $offset");
        $query->bindValue(1, $this->agreement->getID());

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($rate) => Rate::getInstanceOf($rate), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * Obtém modelo de contrato
     * @return Rate modelo de contrato
     */
    public function getRate(): Rate
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare('SELECT * FROM Rate WHERE agreement = ? AND author = ?');
        $query->bindValue(1, $this->rate->getAgreement());
        $query->bindValue(2, $this->rate->getAuthor());

        if ($query->execute()) { // Executa se a query for aceita
            return Rate::getInstanceOf($this->fetchRecord($query, false));
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
        $query = $this->getConnection()->prepare("UPDATE rate SET $column = ? WHERE agreement = ? AND author = ?");

        // Substitui interrogações pelos valores das variáveis
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->rate->getAgreement());
        $query->bindValue(3, $this->rate->getAuthor());

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): bool
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM rate WHERE agreement = ? AND author = ?');
        $query->bindValue(1, $this->rate->getAgreement());
        $query->bindValue(2, $this->rate->getAuthor());

        return $query->execute();
    }
}
