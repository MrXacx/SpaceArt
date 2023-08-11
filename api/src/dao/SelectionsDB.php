<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\SelectionModel;
use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Selections
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class SelectionsDB extends DatabaseAcess
{
    /**
     * Nome da coluna do ID do criador da seleção
     * @var string
     */
    public const OWNER_ID = 'owner_id';

    /**
     * Nome da coluna do preço
     * @var string
     */
    public const PRICE = 'price';

    /**
     * Nome da coluna do tipo de arte
     * @var string
     */
    public const ART = 'art';

    /**
     * Nome da coluna da data de início da seleção
     * @var string
     */
    public const INITAL_DATETIME = 'inital_datetime';

    /**
     * Nome da coluna da data de fim da seleção
     * @var string
     */
    public const FINAL_DATETIME = 'final_datetime';

    /**
     * Nome da coluna de status
     * @var bool
     */
    public const LOCKED = 'locked';

    /**
     * Modelo de seleção a ser manipulado
     * @var SelectionModel
     */
    private SelectionModel $selection;

    /**
     * @param SelectionModel $selection Modelo de seleção a ser manipulado
     */
    function __construct(SelectionModel $selection) {
        $this->selection = $selection;
        parent::__construct();
    }

    /**
     * Insere seleção na tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function create(): int
    {
        try {

            $this->selection->setID($this->getRandomID()); // Gera uuid
            $datetime = $this->selection->getDatetime(); // Obtém datas e horários de início e fim

            // Passa query SQL de criação
            $query = $this->getConnection()->prepare('INSERT INTO Selections (id, owner_id, price, inital_datetime, final_datetime, art) VALUES (?,?,?,?,?,?)');

            // Substitui interrogações pelos valores dos atributos
            $query->bindValue(1, $this->selection->getID());
            $query->bindValue(2, $this->selection->getOwnerID());
            $query->bindValue(3, $this->selection->getPrice());
            $query->bindValue(4, $datetime['inital']);
            $query->bindValue(5, $datetime['final']);

            $query->bindValue(6, $this->selection->getArt());

            if ($query->execute()) { // Executa se a query não falhar
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
                $message = "\"$column\" não é uma coluna da tabela Selections"; // Define mensagem de erro
                goto error; // Pula execução do método
            }

            // Determina query SQL de leitura
            $query = $this->getConnection()->prepare("SELECT id, $column FROM Selections WHERE id = ?");
            $query->bindValue(1, $this->selection->getID()); // Substitui interrogação na query pelo ID passado

            if ($query->execute()) { // Executa se consulta não falhar
                return $this->formatResultOfGet($query); // Retorna valor que 
            }

            // Executa em caso de falhas esperadas
            error:
            throw new \RuntimeException($message ?? 'Operação falhou!');
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Obtém modelo de seleção configurado com base nos dados do banco
     * 
     * @return SelectionModel Modelo da seleção
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function getSelection(): SelectionModel
    {
        try {
            // Determina query SQL de leitura
            $query = $this->getConnection()->prepare('SELECT * FROM Selections WHERE id = ?');
            $query->bindValue(1, $this->selection->getID()); // Substitui interrogação na query pelo ID passado

            if ($query->execute()) { // Executa se a query for aceita
                return SelectionModel::getInstanceOf($this->formatResultOfGet($query));
            }

            // Executa em caso de falhas esperadas
            throw new \RuntimeException('Operação falhou!');
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Obtém todos os dados não sigilosos referents a um usuário
     * 
     * @param UserModel Modelo de usuário
     * @return array Lista de dados não sigilosos
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha na consulta
     */
    public function getAll(\App\Model\UserModel $user): array{      
        try{
            $query = parent::getConnection()->prepare("SELECT * FROM Selections");
                
            $id =  $user->getID();

            $query->bindParam(1, $id);
            $query->bindParam(2, $id);

            if($query->execute()){
                return $query->fetchAll(\PDO::FETCH_ASSOC);
            }

            throw new RuntimeException("Operação falhou");

        } catch(RuntimeException|PDOException $ex){
            throw new \RuntimeException($ex->getMessage());            
        }
    }

    /**
     * Atualiza determinada célula da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function update(string $column, string $value): int
    {
        try {

            if (!static::isColumn($column)) { // Executa se coluna informada não pertencer à tabela
                $message = "\"$column\" não é uma coluna da tabela Selections"; // Define mensagem de erro
                goto error; // Pula execução do método
            } else if (!$this->dataValidator->isValidToFlag($column, $value)) { // Executa se o valor não conidzer com a coluna
                return 0;
            }

            // Passa query SQL de atualização
            $query = $this->getConnection()->prepare("UPDATE Selections SET $column = ? WHERE id = ?");

            // Substitui interrogações pelos valores das variáveis
            $query->bindValue(1, $value);
            $query->bindValue(2, $this->selection->getID());

            if ($query->execute()) { // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa em caso de falhas esperadas
            error:
            throw new \RuntimeException($message ?? 'Operação falhou!');
        } catch (RuntimeException | PDOException $ex) {
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Deleta seleção da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function delete(): int
    {
        try {
            // Deleta seleção do banco
            $query = $this->getConnection()->prepare('DELETE FROM Selections WHERE id = ?');
            $query->bindValue(1, $this->selection->getID());
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
        $columns = [self::OWNER_ID, self::PRICE, self::ART, self::INITAL_DATETIME, self::FINAL_DATETIME];
        return !is_bool(array_search($column, $columns));
    }
}
