<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\UsersDB;
use App\Model\Enterprise;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class EnterpriseDB extends UsersDB
{
    public const CNPJ = 'CNPJ';
    public const DISTRICT = 'district';
    public const ADDRESS = 'address';

    private Enterprise|null $enterprise;

    /**
     * @param Enterprise $enterprise Modelo de empreendimento a ser manipulado
     */
    function __construct(Enterprise $enterprise = null)
    {
        parent::__construct($enterprise);
        $this->enterprise = $enterprise;
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function create(): bool
    {
        if (parent::create()) {

            // Passa query SQL de criação
            $query = $this->getConnection()->prepare('INSERT INTO enterprise (id, CNPJ, district, address) VALUES (?,?,?,?)');

            // Substitui interrogações pelos valores dos atributos
            $query->bindValue(1, $this->enterprise->getID());
            $query->bindValue(2, $this->enterprise->getCNPJ());
            $query->bindValue(3, $this->enterprise->getDistrict());
            $query->bindValue(4, $this->enterprise->getAddress());


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
    public function getList(int $offset = 0, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT users.id, name, image, CEP, federation, district, city, address, rate, website FROM enterprise INNER JOIN users ON users.id = enterprise.id LIMIT $limit OFFSET $offset");

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($user) => Enterprise::getInstanceOf($user), $this->fetchRecord($query));
        }
        throw new RuntimeException('Operação falhou!'); // Executa se alguma falha esperdada ocorrer
    }

    /**
     * Consulta lista aleatória de artistas na tabela filtrada pela localização
     * 
     * @param int $offset Linha inicial da consulta
     * @param int $limit Número máximo de registros retornados
     */
    public function getRandomListByLocation(int $offset = 0, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare(
            "SELECT users.id, name, image, CEP, federation, city, art, wage, rate, website FROM enterprise
            INNER JOIN users ON users.id = enterprise.id
            WHERE city = ? AND federation = ?
            ORDER BY RAND()
            LIMIT $limit OFFSET $offset"
        );

        $query->bindValue(1, $this->enterprise->getCity());
        $query->bindValue(2, $this->enterprise->getFederation());

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($user) => Enterprise::getInstanceOf($user), $this->fetchRecord($query));
        }
        throw new RuntimeException('Operação falhou!'); // Executa se alguma falha esperdada ocorrer
    }

    /**
     * Consulta lista de artistas na tabela filtrada pelo nome
     * 
     * @param int $offset Linha inicial da consulta
     * @param int $limit Número máximo de registros retornados
     */

    public function getListByName(int $offset = 0, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare(
            "SELECT users.id, name, image, CEP, federation, city, art, wage, rate, website FROM enterprise
            INNER JOIN users ON users.id = enterprise.id
            WHERE name = ?
            ORDER BY name
            LIMIT $limit OFFSET $offset"
        );

        $query->bindValue(1, $this->enterprise->getName());

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn($user) => Enterprise::getInstanceOf($user), $this->fetchRecord($query));
        }
        throw new RuntimeException('Operação falhou!'); // Executa se alguma falha esperdada ocorrer
    }

    /**
     * Obtém modelo de empreendimento com dados não sensíveis
     * @return Enterprise Modelo de empreendimento
     */
    public function getUnique(): Enterprise
    {
        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT users.id, name, image, CEP, federation, district, city, address, rate, website FROM enterprise INNER JOIN users ON users.id = enterprise.id WHERE users.id = ?');
        $query->bindValue(1, $this->enterprise->getID()); // Substitui interrogação pelo ID

        if ($query->execute()) { // Executa se a query for aceita
            return Enterprise::getInstanceOf($this->fetchRecord($query, false));
        }
        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * Obtém modelo de empreendimento com todos os dados disponíveis
     * @return Enterprise Modelo de empreendimento
     */
    public function getUser(): Enterprise
    {

        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT * FROM enterprise INNER JOIN users ON enterprise.id = users.id WHERE token = ?');
        $query->bindValue(1, $this->enterprise->getID()); // Substitui interrogação pelo ID

        if ($query->execute()) { // Executa se a query for aceita
            return Enterprise::getInstanceOf($this->fetchRecord($query, false));
        }
        // Executa em caso de falhas esperadas
        throw new RuntimeException('Operação falhou!');
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function update(string $column, string $value): bool
    {

        if (UsersDB::isColumn(parent::class, $column)) {
            return parent::update($column, $value);
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE enterprise SET $column = ? WHERE token = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->enterprise->getID());

        return $query->execute();
    }
}