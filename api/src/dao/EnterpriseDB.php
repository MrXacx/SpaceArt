<?php

declare(strict_types=1);

namespace App\DAO;

use App\DAO\Enumerate\UserColumn;
use App\Model\Enterprise;
use App\Model\User;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class EnterprisesDB extends UsersDB
{

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
    public function create(): int
    {
        parent::create();

        // Passa query SQL de criação
        $query = $this->getConnection()->prepare('INSERT INTO enterprise (id, CNPJ, district, address) VALUES (?,?,?,?)');

        // Substitui interrogações pelos valores dos atributos
        $query->bindValue(1, $this->enterprise->getID());
        $query->bindValue(2, $this->enterprise->getCNPJ());
        $query->bindValue(3, $this->enterprise->getDistrict());
        $query->bindValue(4, $this->enterprise->getAddress());


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

        if(UserColumn::isColumn($column)){
            return parent::update($column, $value);          
        }

        // Passa query SQL de atualização
        $query = $this->getConnection()->prepare("UPDATE enterprise SET $column = ? WHERE id = ?");

        // Substitui interrogações
        $query->bindValue(1, $value);
        $query->bindValue(2, $this->enterprise->getID());

        if ($query->execute()) { // Executa em caso de sucesso na operação
            return ($query->rowCount()); // Retorna o número de linhas afetadas
        }

        // Executa caso alguma falha esperada aconteça
        throw new RuntimeException('Operação falhou!');
    }

}
