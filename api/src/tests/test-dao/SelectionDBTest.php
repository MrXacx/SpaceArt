<?php

namespace App\Tests;
require_once __DIR__.'/../../index.php';

use App\Models\SelectionModel;
use App\DAO\SelectionDB;
use RuntimeException;

/**
 * Classe de teste de SelectionDB
 * 
 * @package Tests
 * @see src/dao/SelectionDB.php
 */
class SelectionDBTest extends \PHPUnit\Framework\TestCase{
    /**
     * Objeto de manipulação de tabela
     * @var ContractDB
     */
    private static SelectionDB $db;

    /**
     * Objeto de manipulação de seleção
     * @var SelectionModel
     */
    private static SelectionModel $selection;
    
    /**
     * Configura classe antes dos testes iniciarem
     */
    public static function setUpBeforeClass(): void{
        // Cria modelo de seleção
        self::$selection = new SelectionModel('12345');
        self::$selection->setDate('2023-08-31', '2023-12-31clear');
        self::$selection->setTime('09:23', '12:03');
        self::$selection->setPrice('120');
        self::$selection->setArt('música');

        // Inicia manipulador de tabela
        self::$db = new SelectionDB(self::$selection);
    }

    public function testValidColumnExists(): void{
        $this->assertTrue(SelectionDB::isColumn(SelectionDB::INITAL_DATETIME));
    }

    public function testInvalidColumnExists(): void{
        $this->assertFalse(SelectionDB::isColumn('DESC'));
    }

    public function testCreateValidSelection(): void{
        $this->assertEquals(1, self::$db->create());
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadValidColumn(): void{
        $this->assertEquals(['id'=>self::$selection->getID(), SelectionDB::OWNER_ID=>self::$selection->getOwnerID()], self::$db->read(SelectionDB::OWNER_ID));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadInvalidColumn(): void{
        $col = 'a';
        
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        self::$db->read($col);
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadSelection(): void{       
        $this->assertEquals(self::$selection, self::$db->readSelection());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateColumn(): void{      
        self::$db->update(SelectionDB::ART, 'dança');
        $this->assertEquals(['id'=>self::$selection->getID(), SelectionDB::ART=>'dança'], self::$db->read(SelectionDB::ART));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateInvalidColumn(): void{
        $col = 'b';
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        self::$db->update($col, '14:35');
        
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testDeletSelection(): void{
        $this->assertEquals(1, self::$db->delete());
    }
}

?>