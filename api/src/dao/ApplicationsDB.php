<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\ApplicationModel;
use App\Model\SelectionModel;
use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Selection_Applications
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class ApplicationsDB extends DatabaseAcess
{

    public const ARTIST = 'artist';
    public const SELECTION = 'selection';
    public const LAST_CHANGE = 'last_change';

    /**
     * Modelo de candidatura a ser manipulado
     * @var ApplicationModel
     */
    private ApplicationModel $application;

    private SelectionModel|null $selection;

    /**
     * @param ApplicationModel $application Modelo de candidatura a ser manipulado
     */
    function __construct(ApplicationModel $application, SelectionModel $selection = null)
    {
        $this->application = $application;
        $this->selection =  $selection;
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

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO Selection_Applications (selection, artist) VALUES (?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->application->getSelectionID());
        $query->bindValue(2, $this->application->getUserID());

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
        $query = $this->getConnection()->prepare("SELECT * FROM Selection_Applications WHERE selection = ? ORDER BY last_change LIMIT $limit OFFSET $offset");
        $query->bindValue(1, $this->selection->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($application) => ApplicationModel::getInstanceOf($application), $this->fetchRecord($query));
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
        throw new RuntimeException('Não há suporte para atualizações na tabela Selection_Applications');
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
        $query = $this->getConnection()->prepare('DELETE FROM Selection_Applications WHERE selection = ? AND artist = ?');

        $query->bindValue(1, $this->application->getSelectionID());
        $query->bindValue(2, $this->application->getUserID());

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
        return $column == self::ARTIST || $column == self::SELECTION || $column == self::LAST_CHANGE;
    }
}
