<?php

namespace App\Tests;

require_once __DIR__.'/../../index.php';

use App\Models\ContractModel;
use App\DAO\ContractDB;
use RuntimeException;

class ContractDBTest extends \PHPUnit\Framework\TestCase{
    private static ContractDB $db;
    private static ContractModel $contract;
    

    public static function setUpBeforeClass(): void{
        self::$contract = new ContractModel('01258', '02548', 85);
        self::$contract->setDate('2024-07-04');
        self::$contract->setTime('07:24', '08:32');
        self::$contract->setArt('escultura');
       
        self::$db = new ContractDB(self::$contract);
    }

    public function testValidColumnExists(){
        parent::assertTrue(ContractDB::isColumn(ContractDB::PRICE));
    }

    public function testInvalidColumnExists(){
        parent::assertFalse(ContractDB::isColumn('0'));
    }

    public function testCreateValidContract(){
        parent::assertEquals(1, self::$db->create());
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadValidColumn(){
        parent::assertEquals(['id'=>self::$contract->getID(), ContractDB::PRICE=>self::$contract->price], self::$db->read(ContractDB::PRICE));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadInvalidColumn(){
        $col = 'a';
        
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        self::$db->read($col);
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadContract(){       
        parent::assertEquals(self::$contract, self::$db->readContract());
    }

    /**
     * @depends testCreateValidContract
     */
    public function testUpdateColumn(){
        self::$db->create(self::$contract);        
        self::$db->update(ContractDB::FINAL_TIME, '14:35');
        parent::assertEquals(['id'=>self::$contract->getID(), ContractDB::FINAL_TIME=>'14:35:00'], self::$db->read(ContractDB::FINAL_TIME));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testUpdateInvalidColumn(){
        $col = 'b';
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        self::$db->create(self::$contract);
        self::$db->update($col, '14:35');
        
    }

    /**
     * @depends testCreateValidContract
     */
    public function testDeletContract(){
        parent::assertEquals(1, self::$db->delete());
    }

}

?>