<?php

require_once __DIR__.'/../../src/index.php';

use App\Model\SelectionModel;
use App\DAO\SelectionsDB;

/**
 * Classe de teste de SelectionsDB
 * 
 * @package Tests
 * @see src/dao/SelectionsDB.php
 */
class SelectionsDBTest extends \PHPUnit\Framework\TestCase{
    /**
     * Objeto de manipulação de tabela
     * @var ContractsDB
     */
    private static SelectionsDB $db;

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
        self::$selection = new SelectionModel('1');
        self::$selection->setDate('2023-08-31', '2023-12-31');
        self::$selection->setTime('09:23', '12:03');
        self::$selection->setPrice('120');
        self::$selection->setArt('música');

        // Inicia manipulador de tabela
        self::$db = new SelectionsDB(self::$selection);
    }

    public function testValidColumnExists(): void{
        $this->assertTrue(SelectionsDB::isColumn(SelectionsDB::INITAL_DATETIME));
    }

    public function testInvalidColumnExists(): void{
        $this->assertFalse(SelectionsDB::isColumn('DESC'));
    }

    public function testCreateValidSelection(): void{
        $this->assertEquals(1, self::$db->create());
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testGetValidColumn(): void{
        $this->assertEquals(['id'=>self::$selection->getID(), SelectionsDB::OWNER_ID=>self::$selection->getOwnerID()], self::$db->get(SelectionsDB::OWNER_ID));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testGetInvalidColumn(): void{
        $col = 'a';
        
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        self::$db->get($col);
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testGetSelection(): void{       
        $this->assertEquals(self::$selection, self::$db->getSelection());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateColumn(): void{      
        self::$db->update(SelectionsDB::ART, 'dança');
        $this->assertEquals(['id'=>self::$selection->getID(), SelectionsDB::ART=>'dança'], self::$db->get(SelectionsDB::ART));
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
