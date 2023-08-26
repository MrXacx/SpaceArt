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

    private Enterprise $enterprise;

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
        parent::create();

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO enterprise (id, CNPJ, district, address) VALUES (?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->enterprise->getID());
        $query->bindValue(2, $this->enterprise->getCNPJ());
        $query->bindValue(3, $this->enterprise->getDistrict());
        $query->bindValue(4, $this->enterprise->getAddress());


        return $query->execute();
    }

    /**
     * @see abstracts/DatabaseAcess.php
     */
    public function getList(int $offset = 1, int $limit = 10): array
    {
        // Determina query SQL de leitura
        $query = $this->getConnection()->prepare("SELECT id, name, image, CEP, federation, district, city, address, rate, website FROM enterprise INNER JOIN users ON users.id = enterprise.id LIMIT $limit OFFSET $offset");

        if ($query->execute()) { // Executa se consulta não falhar
            return array_map(fn ($user) => Enterprise::getInstanceOf($user), $this->fetchRecord($query));
        }
        throw new RuntimeException('Operação falhou!'); // Executa se alguma falha esperdada ocorrer
    }

    /**
     * Obtém modelo de empreendimento com dados não sensíveis
     * @return Enterprise Modelo de empreendimento
     */
    public function getUnique(string $id): Enterprise
    {
        // Define query SQL para obter todas as colunas da linha do usuário
        $query = $this->getConnection()->prepare('SELECT id, name, image, CEP, federation, district, city, address, rate, website FROM enterprise INNER JOIN users ON users.id = enterprise.id WHERE artist.id = ?');
        $query->bindValue(1, $id); // Substitui interrogação pelo ID

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
        $query = $this->getConnection()->prepare('SELECT * FROM enterprise INNER JOIN users ON enterprise.id = users.id WHERE enterprise.id = ?');
        $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID

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
        $query = $this->getConnection()->prepare("UPDATE enterprise SET $column = ? WHERE id = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->enterprise->getID());

        return $query->execute();
    }
}
