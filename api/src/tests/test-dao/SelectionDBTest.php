<?php

namespace App\Tests;

require_once __DIR__.'/../../index.php';

use App\Models\SelectionModel;
use App\DAO\SelectionDB;
use RuntimeException;

class SelectionDBTest extends \PHPUnit\Framework\TestCase{
    private static SelectionDB $db;
    private static SelectionModel $selection;
    

    public static function setUpBeforeClass(): void{
        self::$selection = new SelectionModel('12345');
        self::$selection->setDate('2023-08-31', '2023-12-31clear');
        self::$selection->setTime('09:23', '12:03');
        self::$selection->setPrice('120');
        self::$selection->setArt('música');

        self::$db = new SelectionDB(self::$selection);
    }

    public function testValidColumnExists(){
        parent::assertTrue(SelectionDB::isColumn(SelectionDB::INITAL_DATETIME));
    }

    public function testInvalidColumnExists(){
        parent::assertFalse(SelectionDB::isColumn('DESC'));
    }

    public function testCreateValidSelection(){
        parent::assertEquals(1, self::$db->create());
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadValidColumn(){
        parent::assertEquals(['id'=>self::$selection->getID(), SelectionDB::OWNER_ID=>self::$selection->getOwnerID()], self::$db->read(SelectionDB::OWNER_ID));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadInvalidColumn(){
        $col = 'a';
        
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        self::$db->read($col);
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadSelection(){       
        parent::assertEquals(self::$selection, self::$db->readSelection());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateColumn(){      
        self::$db->update(SelectionDB::ART, 'dança');
        parent::assertEquals(['id'=>self::$selection->getID(), SelectionDB::ART=>'dança'], self::$db->read(SelectionDB::ART));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateInvalidColumn(){
        $col = 'b';
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        self::$db->update($col, '14:35');
        
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testDeletSelection(){
        parent::assertEquals(1, self::$db->delete());
    }

}

?>