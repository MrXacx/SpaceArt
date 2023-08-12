<?php

declare(strict_types=1);

namespace App\DAO\Template;

require_once __DIR__ . '/../../../vendor/autoload.php';

use PDO;
use PDOException;
use PDOStatement;
use App\Util\DataValidator;

/**
 * Classe de conexão com o banco de dados
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
abstract class DatabaseAcess
{
    /**
     * Objeto de conexão com o banco
     * @var PDO
     */
    private PDO $connection;

    /**
     * Objeto de validação de dados
     * @var DataValidator
     */
    protected DataValidator $dataValidator;

    protected \App\Model\UserModel|null $user;

    function __construct()
    {
        try {
            $this->connection = new PDO($_ENV['db_host'], $_ENV['db_user'], $_ENV['db_pwd']);
            $this->dataValidator = new DataValidator();
        } catch (\Exception $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Obtém objeto de manipulação do banco
     * @return PDO Manipulador do banco de dados
     * 
     */
    protected function getConnection(): PDO
    {
        return $this->connection;
    }

    /**
     * Obtém uiid
     * @return String Sequência aleatória de 36 dígitos
     * 
     */
    protected function getRandomID(): string
    {
        return \Ramsey\Uuid\Uuid::uuid7()->toString();
    }

    /**
     * Obtém valor consultado no banco de dados
     * @param PDOStatement|false $query Objeto de consulta à tabela
     * @return array|string Valor buscado no banco
     * @throws PDOException Caso valor retornado seja de um tipo diferente de array ou string
     */
    protected function fetchRecord(PDOStatement $query, bool $multipleRecords = true): array
    {
        $response = $multipleRecords ? $query->fetchAll(\PDO::FETCH_ASSOC) : $query->fetch(\PDO::FETCH_ASSOC);
        if(is_array($response)){
            return $response;
        }
        throw new \RuntimeException('Registro(s) não encontrado(s)');
    }

    function __destruct()
    {
        unset($this->connection);
    }

    /**
     * Insere linhs na tabela
     * 
     * @return int Número de linhas afetadas
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    abstract public function create(): int;

    /**
     * Obtém determinada célula da tabela
     * 
     * @param int $offset Linha de início da consulta 
     * @param int $limit Quantidade de registros a ser retornada
     * @return array Lista de registros
     */
    abstract public function getList(int $offset = 1, int $limit = 10): array;

    /**
     * Atualiza determinada célula do banco
     * 
     * @param string $column Nome da coluna que deve sofrer alterações
     * @param string $value Novo valor da coluna
     * @return int Número de linhas afetadas
     */
    abstract public function update(string $column, string $value): int;

    /**
     * Deleta linha do banco
     * 
     * @return int Número de linhas deletadas
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    abstract public function delete(): int;

    /**
     * Confere se valor é idêntico ao nome de alguma coluna da tabela
     * 
     * @param string Nome da coluna
     * @return bool Retorna true se coluna for compatível
     */
    abstract public static function isColumn(string $column): bool;
}
