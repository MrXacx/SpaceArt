<?php

declare(strict_types=1);

namespace App\DAO\Template;

require_once __DIR__ . '/../../../vendor/autoload.php';

use PDO;
use PDOException;
use PDOStatement;
use ReflectionClassConstant;

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

    public const DB_TIMESTAMP_FORMAT = 'Y-m-d H:i:s';
    public const USUAL_TIMESTAMP_FORMAT = 'd/m/Y H:i:s';
    public const DB_DATE_FORMAT = 'Y-m-d';
    public const USUAL_DATE_FORMAT = 'd/m/Y';
    public const DB_TIME_FORMAT = 'Y-m-d';

    protected \App\Model\Template\User|null $user;

    function __construct()
    {
        try {
            $this->connection = new PDO($_ENV['db_host'], $_ENV['db_user'], $_ENV['db_pwd']);
        } catch (\Exception $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Obtém objeto de manipulação do banco
     * @return PDO Manipulador do banco de dados
     * 
     */
    final protected function getConnection(): PDO
    {
        return $this->connection;
    }

    /**
     * Obtém uuid
     * @return string Sequência aleatória de 36 dígitos
     * 
     */
    final protected function getRandomID(): string
    {
        return \Ramsey\Uuid\Uuid::uuid7()->toString();
    }

    /**
     * Obtém valor consultado no banco de dados
     * @param PDOStatement $query Objeto de consulta à tabela
     * @param bool $multipleRecords Parâmetro de controle de múltiplos registros esperados
     * @return array Valor buscado no banco
     * @throws PDOException Caso valor retornado seja de um tipo diferente de array ou string
     */
    final protected function fetchRecord(PDOStatement $query, bool $multipleRecords = true): array
    {
        $response = $multipleRecords ? $query->fetchAll(PDO::FETCH_ASSOC) : $query->fetch(PDO::FETCH_ASSOC);
        if (is_array($response)) {
            return $response;
        }
        throw new \RuntimeException('Registro(s) não encontrado(s)');
    }

    final public function isColumn(string $class, string $column): bool
    {
        $cases = (new \ReflectionClass($class))->getConstants(ReflectionClassConstant::IS_PUBLIC);
        return false !== array_search($column, $cases, true);
    }

    function __destruct()
    {
        unset($this->connection);
    }

    /**
     * Insere linhs na tabela
     * 
     * @return int Número de linhas afetadas
     * @throws \RuntimeException Falha causada pela conexão com o banco de dados
     */
    abstract public function create(): bool;

    /**
     * Obtém lista de dados não sensíveis da entidade
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
    abstract public function update(string $column, string $value): bool;

    /**
     * Deleta linha do banco
     * 
     * @return int Número de linhas deletadas
     * @throws \RuntimeException Falha causada pela conexão com o banco de dados
     */
    abstract public function delete(): bool;
}