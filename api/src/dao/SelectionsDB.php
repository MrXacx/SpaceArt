<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\SelectionModel;
use App\Model\UserModel;
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
    function __construct(SelectionModel $selection, UserModel $user = null)
    {
        $this->selection = $selection;
        $this->user = $user;
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
        $query = $this->getConnection()->prepare("SELECT * FROM Selections WHERE owner_id = ? ORDER BY ABS(DATEDIFF(inital_date, CURDATE())) LIMIT $limit OFFSET $offset");

        $query->bindValue(1, $this->user->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return
                array_map(fn ($contract) => SelectionModel::getInstanceOf($contract), $this->fetchRecord($query));
        }

        throw new \RuntimeException('Operação falhou!'); // Executa em caso de falhas esperadas
    }

    /**
     * Obtém modelo de seleção configurado com base nos dados do banco
     * 
     * @return SelectionModel Modelo da seleção
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function getSelection(): SelectionModel
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare('SELECT * FROM Selections WHERE id = ?');
        $query->bindValue(1, $this->selection->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se a query for aceita
            return SelectionModel::getInstanceOf($this->fetchRecord($query, false));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * Obtém todos os dados não sigilosos referents a um usuário
     * 
     * @return array Lista de dados não sigilosos
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha na consulta
     */
    public function getAll(): array
    {
        $query = parent::getConnection()->prepare("SELECT * FROM Selections");

        $id =  $this->user->getID();

        $query->bindParam(1, $id);
        $query->bindParam(2, $id);

        if ($query->execute()) {
            return $this->fetchRecord($query);
        }

        throw new RuntimeException("Operação falhou");
    }

    /**
     * Atualiza determinada célula da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function update(string $column, string $value): int
    {

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
    }

    /**
     * Deleta seleção da tabela
     * 
     * @see abstracts/DatabaseAcess.php
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function delete(): int
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM Selections WHERE id = ?');
        $query->bindValue(1, $this->selection->getID());
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
        $columns = [self::OWNER_ID, self::PRICE, self::ART, self::INITAL_DATETIME, self::FINAL_DATETIME];
        return !is_bool(array_search($column, $columns));
    }
}
