<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\ApplicationModel;
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

    /**
     * @param ApplicationModel $application Modelo de candidatura a ser manipulado
     */
    function __construct(ApplicationModel|null $application) {
        if(isset($application)){
            $this->application = $application;
        }
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
        try {

            $this->application->setID($this->getRandomID()); // Gera uuid
            
            // Passa query SQL de criação
            $query = $this->getConnection()->prepare('INSERT INTO Selection_Applications (id, selection, artist) VALUES (?,?,?)');

            // Substitui interrogações pelos valores dos atributos
            $query->bindValue(1, $this->application->getID());
            $query->bindValue(2, $this->application->getSelectionID());
            $query->bindValue(3, $this->application->getUserID());
            
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa se houver alguma falha esperada
            throw new \RuntimeException('Operação falhou!');
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Obtém determinada célula da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function get(string $column): array
    {
        try {
            if (!static::isColumn($column)) { // Executa se coluna informada não pertencer à tabela
                $message = "\"$column\" não é uma coluna da tabela Selection_Applications"; // Define mensagem de erro
                goto error; // Pula execução do método
            }

            // Determina query SQL de leitura
            $query = $this->getConnection()->prepare("SELECT id, $column FROM Selection_Applications WHERE id = ?");
            $query->bindValue(1, $this->application->getID()); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se consulta não falhar
                return parent::formatResultOfGet($query); // Retorna valor que 
            }

            // Executa em caso de falhas esperadas
            error:
            throw new \RuntimeException($message ?? 'Operação falhou!');
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }
    
    /**
     * Obtém todos os dados não sigilosos referentEs a uma seleção
     * 
     * @return array Lista de dados não sigilosos
     * @throws RuntimeException Falha na consulta
     */
    public function getAll(): array{
        try{
            // Determina query SQL de leitura
            $query = $this->getConnection()->prepare('SELECT * FROM Selection_Applications WHERE selection = ?');
            $query->bindValue(1, $this->application->getSelectionID()); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se a query for aceita
                $applicationList = [];
                foreach ($query->fetchAll(\PDO::FETCH_ASSOC) as $application) {
                    $applicationList[] = ApplicationModel::getInstanceOf($application);
                }
                return $applicationList;
            }

            // Executa em caso de falhas esperadas
            throw new \RuntimeException('Operação falhou!');
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
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
        try {
            // Deleta candidatura do banco
            $query = $this->getConnection()->prepare('DELETE FROM Selection_Applications WHERE selection = ? AND artist = ?');
            
            $query->bindValue(1, $this->application->getSelectionID());
            $query->bindValue(2, $this->application->getUserID());

            if ($query->execute()) { // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            throw new \RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Confere se valor é idêntico ao nome de alguma coluna da tabela
     * 
     * @param string Nome da coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column): bool
    {
        return $column == self::ARTIST || $column == self::SELECTION | $column == self::LAST_CHANGE;
    }
}
