<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Selection;
use App\Model\User;
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
     * @var Selection
     */
    private Selection $selection;

    /**
     * @param Selection $selection Modelo de seleção a ser manipulado
     * @param User $user Modelo de usuário a ser considerado na manipulação [opcional]
     */
    function __construct(Selection $selection, User $user = null)
    {
        $this->selection = $selection;
        $this->user = $user;
        parent::__construct();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): int
    {
        $this->selection->setID($this->getRandomID()); // Gera uuid
        $datetime = $this->selection->getDatetime(); // Obtém datas e horários de início e fim

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO selection (id, owner_id, price, inital_datetime, final_datetime, art) VALUES (?,?,?,?,?,?)');

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
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT * FROM selection WHERE owner_id = ? ORDER BY ABS(DATEDIFF(inital_date, CURDATE())) LIMIT $limit OFFSET $offset");

        $query->bindValue(1, $this->user->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($agreement) => Selection::getInstanceOf($agreement), $this->fetchRecord($query));
        }

        throw new \RuntimeException('Operação falhou!'); // Executa em caso de falhas esperadas
    }

    /**
     * Obtém modelo de seleção configurado com base nos dados do banco
     * 
     * @return Selection Modelo da seleção
     * @throws RuntimeException Falha causada pela conexão com o banco de dados
     */
    public function getSelection(): Selection
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare('SELECT * FROM selection WHERE id = ?');
        $query->bindValue(1, $this->selection->getID()); // Substitui interrogação na query pelo ID passado

        if ($query->execute()) { // Executa se a query for aceita
            return Selection::getInstanceOf($this->fetchRecord($query, false));
        }

        // Executa em caso de falhas esperadas
        throw new \RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getAll(): array
    {
        $query = parent::getConnection()->prepare("SELECT * FROM selection");

        $id =  $this->user->getID();

        $query->bindParam(1, $id);
        $query->bindParam(2, $id);

        if ($query->execute()) {
            return $this->fetchRecord($query);
        }

        throw new RuntimeException("Operação falhou");
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): int
    {

        if (!static::isColumn($column)) { // Executa se coluna informada não pertencer à tabela
            $message = "\"$column\" não é uma coluna da tabela selection"; // Define mensagem de erro
            goto error; // Pula execução do método
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE selection \SET $column = ? WHERE id = ?");

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
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): int
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM selection WHERE id = ?');
        $query->bindValue(1, $this->selection->getID());
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
        $columns = [self::OWNER_ID, self::PRICE, self::ART, self::INITAL_DATETIME, self::FINAL_DATETIME];
        return !is_bool(array_search($column, $columns));
    }
}
