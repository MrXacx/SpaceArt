<?php

require_once __DIR__ . '/../../src/config/enviroment.php';

use App\Model\ContractModel;
use App\DAO\ContractsDB;

/**
 * Classe de teste de ContractsDB
 * 
 * @package Tests
 * @see src/dao/ContractsDB.php
 */
class ContractsDBTest extends \PHPUnit\Framework\TestCase
{
    /**
     * Objeto de manipulação de tabela
     * @var ContractsDB
     */
    private static ContractsDB $db;

    /**
     * Objeto de manipulação de contrato
     * @var ContractModel
     */
    private static ContractModel $contract;

    /**
     * Configura classe antes dos testes iniciarem
     */
    public static function setUpBeforeClass(): void
    {
        // Cria modelo de teste
        self::$contract = new ContractModel();
        self::$contract->setHirerID('1');
        self::$contract->setHiredID('2');
        self::$contract->setPrice(85);
        self::$contract->setDate('2024-07-04');
        self::$contract->setTime('07:24', '08:32');
        self::$contract->setArt('escultura');

        self::$db = new ContractsDB(self::$contract);
    }

    public function testValidColumnExists(): void
    {
        $this->assertTrue(ContractsDB::isColumn(ContractsDB::PRICE));
    }

    public function testInvalidColumnExists(): void
    {
        $this->assertFalse(ContractsDB::isColumn('0'));
    }

    public function testCreateValidContract(): void
    {
        $this->assertEquals(1, self::$db->create());
    }

    /**
     * @depends testCreateValidContract
     */
    public function testGetContract(): void
    {
        $this->assertEquals(self::$contract, self::$db->getContract());
    }

    /**
     * @depends testCreateValidContract
     */
    public function testUpdateColumn(): void
    {
        self::$db->create(self::$contract);
        self::$db->update(ContractsDB::FINAL_TIME, '14:35');
        $this->assertEquals('14:35:00', self::$db->getContract(ContractsDB::FINAL_TIME)->getTime()['final']);
    }

    /**
     * @depends testCreateValidContract
     */
    public function testUpdateInvalidColumn(): void
    {
        $col = 'b';
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        self::$db->create(self::$contract);
        self::$db->update($col, '14:35');
    }

    /**
     * @depends testCreateValidContract
     */
    public function testDeletContract(): void
    {
        $this->assertEquals(1, self::$db->delete());
    }
}
