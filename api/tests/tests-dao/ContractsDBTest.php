<?php

require_once __DIR__.'/../../src/index.php';

use App\Model\ContractModel;
use App\DAO\ContractsDB;

/**
 * Classe de teste de ContractsDB
 * 
 * @package Tests
 * @see src/dao/ContractsDB.php
 */
class ContractsDBTest extends \PHPUnit\Framework\TestCase{
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
    public static function setUpBeforeClass(): void{
        // Cria modelo de teste
        self::$contract = new ContractModel('1', '2', 85);
        self::$contract->setDate('2024-07-04');
        self::$contract->setTime('07:24', '08:32');
        self::$contract->setArt('escultura');
       
        // Inicia manipulado de banco
        self::$db = new ContractsDB(self::$contract);
    }

    public function testValidColumnExists(): void{
        $this->assertTrue(ContractsDB::isColumn(ContractsDB::PRICE));
    }

    public function testInvalidColumnExists(): void{
        $this->assertFalse(ContractsDB::isColumn('0'));
    }

    public function testCreateValidContract(): void{
        $this->assertEquals(1, self::$db->create());
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testGetValidColumn(): void{
        $this->assertEquals(['id'=> self::$contract->getID(), ContractsDB::PRICE => self::$contract->price], self::$db->get(ContractsDB::PRICE));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testGetInvalidColumn(): void{
        $col = 'a';
        
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        self::$db->get($col);
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testGetContract(): void{       
        $this->assertEquals(self::$contract, self::$db->getContract());
    }

    /**
     * @depends testCreateValidContract
     */
    public function testUpdateColumn(): void{
        self::$db->create(self::$contract);        
        self::$db->update(ContractsDB::FINAL_TIME, '14:35');
        $this->assertEquals(['id'=>self::$contract->getID(), ContractsDB::FINAL_TIME=>'14:35:00'], self::$db->get(ContractsDB::FINAL_TIME));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testUpdateInvalidColumn(): void{
        $col = 'b';
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        self::$db->create(self::$contract);
        self::$db->update($col, '14:35');
        
    }

    /**
     * @depends testCreateValidContract
     */
    public function testDeletContract(): void{
        $this->assertEquals(1, self::$db->delete());
    }
}
