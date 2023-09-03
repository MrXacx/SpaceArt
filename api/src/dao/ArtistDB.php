<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\UsersDB;
use App\Model\Artist;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class ArtistDB extends UsersDB
{
    public const ART = 'art';
    public const WAGE = 'wage';
    public const CPF = 'cpf';

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
    public function create(): bool
    {
        if (parent::create()) { // Executa se o usuário foi criado

            // Passa query SQL de criação
            $query = $this->getConnection()->prepare('INSERT INTO artist (id, CPF, art, wage) VALUES (?,?,?,?)');

            // Substitui interrogações pelos valores dos atributos
            $query->bindValue(1, $this->artist->getID());
            $query->bindValue(2, $this->artist->getCPF());
            $query->bindValue(3, $this->artist->getArt()->value);
            $query->bindValue(4, $this->artist->getWage());


            if ($query->execute()) { // Executa a inserção funcionar
                return true;
            }

            // Essa linha é essencial para não exista um registro em users que não possa ser encontrado em artist ou enterprise
            $this->delete();

        }
        return false;
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT users.id, name, imageURL, CEP, federation, city, art, wage, rate, website FROM artist INNER JOIN users ON users.id = artist.id LIMIT $limit OFFSET $offset");

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($user) => Artist::getInstanceOf($user), $this->fetchRecord($query));
        }
        throw new RuntimeException('Operação falhou!'); // Executa se alguma falha esperdada ocorrer
    }

    /**
     * Obtém modelo de artista com dados não sensíveis
     * @return Artist Modelo de artista
     */
    public function getUnique(): Artist
    {
        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT users.id, name, imageURL, CEP, federation, city, art, wage, rate, website FROM artist INNER JOIN users ON users.id = artist.id WHERE users.id = ?');
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID

        if ($query->execute()) { // Executa se a query for aceita
            return Artist::getInstanceOf($this->fetchRecord($query, false));
        }
        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * Obtém modelo de artista com todos os dados disponíveis
     * @return Artist Modelo de artista
     */
    public function getUser(): Artist
    {

        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT * FROM artist INNER JOIN users ON artist.id = users.id WHERE users.token = ?');
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID

        if ($query->execute()) { // Executa se a query for aceita
            return Artist::getInstanceOf($this->fetchRecord($query, false));
        }
        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): bool
    {

        if ($this->isColumn(parent::class, $column)) {
            return parent::update($column, $value);
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE artist SET $column = ? WHERE id = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->artist->getID());

        return $query->execute();
    }
}