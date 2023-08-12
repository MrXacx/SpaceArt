<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\ReportModel;
use RuntimeException;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

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
     * @var ReportModel
     */
    private ReportModel $report;

    /**
     * @param ReportModel $report Modelo de candidatura a ser manipulado
     */
    function __construct(ReportModel $report, \App\Model\UserModel $user)
    {
        $this->report = $report;
        $this->user = $user;
        parent::__construct();
    }

    /**
     * Insere candidatura na tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
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
     * Obtém determinada célula da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM Reports WHERE reporter = ? LIMIT $limit OFFSET $offset");
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($report) => ReportModel::getInstanceOf($report), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    public function getReport(): ReportModel
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM Reports WHERE id = ?");
        $query->bindValue(1, $this->report->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return ReportModel::getInstanceOf($this->fetchRecord($query, false));
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
     * Deleta candidatura da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
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
     * Confere se valor é idêntico ao nome de alguma coluna da tabela
     * 
     * @param string Nome da coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column): bool
    {
        return !is_bool(array_search($column, [self::REPORTED, self::REPORTER, self::REASON, self::ACCEPTED]));
    }
}
