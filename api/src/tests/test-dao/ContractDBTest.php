<?php

namespace App\Tests;
require_once __DIR__.'/../../index.php';

use App\Models\ContractModel;
use App\DAO\ContractDB;
use RuntimeException;

/**
 * Classe de teste de ContractDB
 * 
 * @package Tests
 * @see src/dao/ContractDB.php
 */
class ContractDBTest extends \PHPUnit\Framework\TestCase{
    /**
     * Objeto de manipulação de tabela
     * @var ContractDB
     */
    private static ContractDB $db;

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
        self::$contract = new ContractModel('01258', '02548', 85);
        self::$contract->setDate('2024-07-04');
        self::$contract->setTime('07:24', '08:32');
        self::$contract->setArt('escultura');
       
        // Inicia manipulado de banco
        self::$db = new ContractDB(self::$contract);
    }

    public function testValidColumnExists(): void{
        $this->assertTrue(ContractDB::isColumn(ContractDB::PRICE));
    }

    public function testInvalidColumnExists(): void{
        $this->assertFalse(ContractDB::isColumn('0'));
    }

    public function testCreateValidContract(): void{
        $this->assertEquals(1, self::$db->create());
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadValidColumn(): void{
        $this->assertEquals(['id'=> self::$contract->getID(), ContractDB::PRICE => self::$contract->price], self::$db->read(ContractDB::PRICE));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadInvalidColumn(): void{
        $col = 'a';
        
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        self::$db->read($col);
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadContract(): void{       
        $this->assertEquals(self::$contract, self::$db->readContract());
    }

    /**
     * @depends testCreateValidContract
     */
    public function testUpdateColumn(): void{
        self::$db->create(self::$contract);        
        self::$db->update(ContractDB::FINAL_TIME, '14:35');
        $this->assertEquals(['id'=>self::$contract->getID(), ContractDB::FINAL_TIME=>'14:35:00'], self::$db->read(ContractDB::FINAL_TIME));
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
?>