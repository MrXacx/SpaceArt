<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Report;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Reports
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class ReportsDB extends DatabaseAcess
{

    public const REPORTER = 'artist';
    public const REPORTED = 'artist';
    public const REASON = 'selection';
    public const ACCEPTED = 'last_change';

    /**
     * Modelo de candidatura a ser manipulado
     * @var Report
     */
    private Report $report;

    /**
     * @param Report $report Modelo de candidatura a ser manipulado
     * @param User $user Modelo de usuário a ser considerado na manipulação [opcional]
     */
    function __construct(Report $report, \App\Model\User $user)
    {
        $this->report = $report;
        $this->user = $user;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): int
    {

        $this->report->setID($this->getRandomID()); // Gera uuid

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO Reports (id, reporter, reporter, reason) VALUES (?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->report->getID());
        $query->bindValue(2, $this->report->getReporterID());
        $query->bindValue(3, $this->report->getReportedID());
        $query->bindValue(3, $this->report->getReason());

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
        $query = $this->getConnection()->prepare("SELECT * FROM Reports WHERE reporter = ? LIMIT $limit OFFSET $offset");
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($report) => Report::getInstanceOf($report), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    public function getReport(): Report
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM Reports WHERE id = ?");
        $query->bindValue(1, $this->report->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return Report::getInstanceOf($this->fetchRecord($query, false));
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
        throw new RuntimeException('Não há suporte para atualizações na tabela Reports');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): int
    {
        // Deleta candidatura do banco
        $query = $this->getConnection()->prepare('DELETE FROM Reports WHERE id = ?');

        $query->bindValue(1, $this->report->getID());

        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        throw new \RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public static function isColumn(string $column): bool
    {
        return !is_bool(array_search($column, [self::REPORTED, self::REPORTER, self::REASON, self::ACCEPTED]));
    }
}
