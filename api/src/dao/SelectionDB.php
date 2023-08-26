<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Template\DatabaseAcess;
use App\Model\Selection;
use App\Model\User;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Selections
 * 
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class SelectionDB extends DatabaseAcess
{

    public const OWNER = 'owner';
    public const ART = 'art';
    public const INITAL_DATETIME = 'inital_datetime';
    public const FINAL_DATETIME = 'final_datetime';
    public const PRICE = 'price';
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
    public function create(): bool
    {
        $this->selection->setID($this->getRandomID()); // Gera uuid
        $datetime = $this->selection->getDatetime(); // Obtém datas e horários de início e fim

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO selection (id, owner, price, inital_datetime, final_datetime, art) VALUES (?,?,?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->selection->getID());
        $query->bindValue(2, $this->selection->getOwner());
        $query->bindValue(3, $this->selection->getPrice());
        $query->bindValue(4, $datetime['inital']);
        $query->bindValue(5, $datetime['final']);

        $query->bindValue(6, $this->selection->getArt());

        return $query->execute();
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
   /* public function getRandomList(): array
    {
        $query = parent::getConnection()->prepare("SELECT * FROM selection");

        $id =  $this->user->getID();

        $query->bindParam(1, $id);
        $query->bindParam(2, $id);

        if ($query->execute()) {
            return $this->fetchRecord($query);
        }

        throw new RuntimeException("Operação falhou");
    }*/

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): bool
    {
        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE selection \SET $column = ? WHERE id = ?");

        // Substitui interrogações pelos valores das variáveis
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->selection->getID());

        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function delete(): bool
    {
        // Deleta seleção do banco
        $query = $this->getConnection()->prepare('DELETE FROM selection WHERE id = ?');
        $query->bindValue(1, $this->selection->getID());
        return $query->execute();
    }
}
