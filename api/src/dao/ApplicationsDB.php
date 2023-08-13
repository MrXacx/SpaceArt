<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Application;
use App\Model\Selection;
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
     * @var Application
     */
    private Application $application;

    /**
     * Modelo de seleção associado ao modelo de aplicação
     * @var Selection|null
     */
    private Selection|null $selection;

    /**
     * @param Application $application Modelo de candidatura a ser manipulado
     * @param Selection $selection Modelo de seleção a ser considerado na manipulação [opcional]
     */
    function __construct(Application $application, Selection $selection = null)
    {
        $this->application = $application;
        $this->selection =  $selection;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
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
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM Selection_Applications WHERE selection = ? ORDER BY last_change LIMIT $limit OFFSET $offset");
        $query->bindValue(1, $this->selection->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($application) => Application::getInstanceOf($application), $this->fetchRecord($query));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column = null, string $value = null): int
    {
        throw new RuntimeException('Não há suporte para atualizações na tabela Selection_Applications');
    }

    /**
     * @see abstracts/DatabaseAcess.php
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
     * @see abstracts/DatabaseAcess.php
     */
    public static function isColumn(string $column): bool
    {
        return $column == self::ARTIST || $column == self::SELECTION || $column == self::LAST_CHANGE;
    }
}
