<?php

    declare(strict_types = 1);    
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use PDO;
use PDOException;
use PDOStatement;

/**
 * Classe de conexão com o banco de dados
 * @package Utils
 * @author Ariel Santos (MrXacx)
 */
abstract class DatabaseAcess{
    /**
     * Objeto de conexão com o banco
     * @var PDO
     */
    private PDO $connection;

    function __construct(){
        try{
            $this->connection = new PDO($_ENV['db_host'], $_ENV['db_user'], $_ENV['db_pwd']);
        } catch(PDOException $ex){            
            \App\Tools\ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__);
        }
    }

    /**
     * Obtém objeto de manipulação do banco
     * @return PDO Manipulador do banco de dados
     * 
     */
    protected function getConnection(): PDO{
        return $this->connection;
    }

     /**
     * Obtém uiid
     * @return String Sequência aleatória de 36 dígitos
     * 
     */
    protected function getRandomID():string{
        return \Ramsey\Uuid\Uuid::uuid7()->toString();
    }

     /**
     * Obtém valor consultado no banco de dados
     * @param PDOStatement|false $query Objeto de consulta à tabela
     * @return array|string Valor buscado no banco
     * @throws PDOException Caso valor retornado seja de um tipo diferente de array ou string
     */
    protected function validateReading(PDOStatement|false $query): array|string{
        $result = $query->fetch(PDO::FETCH_ASSOC);
        unset($query);
        return (is_array($result) XOR is_string($result)) ? $result : throw new PDOException('Leitura não retornou um valor válido!');
    }

    function __destruct(){
        unset($this->connection);
    }

    /**
     * Insere linhs na tabela
     * 
     * @param object $model Modelo de usuário
     * @return int Número de linhas afetadas
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    abstract public function create(object $model): int;

    /**
     * Obtém determinada célula da tabela
     * 
     * @param string $column Nome da coluna a ser consultada 
     * @param string $id ID do usuário
     * @return string Valor da célula
     */
    abstract public function read(string $column, string $id): string;

    /**
     * Atualiza determinada célula do banco
     * 
     * @param string $column Nome da coluna que deve sofrer alterações
     * @param string $value Novo valor da coluna
     * @param string $id ID do usuário
     * @return int Número de linhas afetadas
     */
    abstract public function update(string $column, string $value, string $id): int;

    /**
     * Deleta linha do banco
     * 
     * @param string $id ID do usuário
     * @return int Número de linhas deletadas
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    abstract public function delete(string $id): int;

    /**
     * Confere se string é compatível com alguma coluna da tabela
     * 
     * @param string Coluna
     * @return bool Retorna true se coluna for compatível
     */
    abstract public static function isColumn(string $column):bool;
}
?>
