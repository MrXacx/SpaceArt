<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Enumerate\UserColumn;
use App\Model\Artist;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class ArtistsDB extends UsersDB
{

    private Artist $artist;

    /**
     * @param Artist $artist Modelo de empreendimento a ser manipulado
     */
    function __construct(Artist $artist = null)
    {
        parent::__construct($artist);
        $this->artist = $artist;
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): int
    {
        parent::create();

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO artist (id, CPF, art, wage_to_hourly, address) VALUES (?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->artist->getID());
        $query->bindValue(2, $this->artist->getCPF());
        $query->bindValue(3, $this->artist->getArt());
        $query->bindValue(4, $this->artist->getWage());


        if ($query->execute()) { // Executa se a query não falhar
            return $query->rowCount(); // Retorna linhas afetadas
        }

        // Executa se houver alguma falha esperada
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): int
    {

        if (UserColumn::isColumn($column)) {
            return parent::update($column, $value);
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE artist SET $column = ? WHERE id = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->artist->getID());

        if ($query->execute()) { // Executa em caso de sucesso na operação
            return ($query->rowCount()); // Retorna o número de linhas afetadas
        }

        // Executa caso alguma falha esperada aconteça
        throw new RuntimeException('Operação falhou!');
    }
}
