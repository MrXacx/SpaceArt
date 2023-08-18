<?php

require_once __DIR__ . '/../../src/config/enviroment.php';

use App\Model\Selection;
use App\DAO\SelectionsDB;

/**
 * Classe de teste de SelectionsDB
 * 
 * @package Tests
 * @see src/dao/SelectionsDB.php
 */
class SelectionsDBTest extends \PHPUnit\Framework\TestCase
{
    /**
     * Objeto de manipulação de tabela
     * @var AgreementsDB
     */
    private static SelectionsDB $db;

    /**
     * Objeto de manipulação de seleção
     * @var Selection
     */
    private static Selection $selection;

    /**
     * Configura classe antes dos testes iniciarem
     */
    public static function setUpBeforeClass(): void
    {
        // Cria modelo de seleção
        self::$selection = new Selection();
        self::$selection->setOwnerID('1');
        self::$selection->setDate('2023-08-31', '2023-12-31');
        self::$selection->setTime('09:23', '12:03');
        self::$selection->setPrice('120');
        self::$selection->setArt('música');

        // Inicia manipulador de tabela
        self::$db = new SelectionsDB(self::$selection);
    }

    public function testValidColumnExists(): void
    {
        $this->assertTrue(SelectionColumn::isColumn(SelectionColumn::INITAL_DATETIME));
    }

    public function testInvalidColumnExists(): void
    {
        $this->assertFalse(SelectionColumn::isColumn('DESC'));
    }

    public function testCreateValidSelection(): void
    {
        $this->assertEquals(1, self::$db->create());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testGetSelection(): void
    {
        $this->assertEquals(self::$selection, self::$db->getSelection());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateColumn(): void
    {
        self::$db->update(SelectionColumn::ART, 'dança');
        $this->assertEquals('dança', self::$db->getSelection()->getArt());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateInvalidColumn(): void
    {
        $col = 'b';
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        self::$db->update($col, '14:35');
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testDeletSelection(): void
    {
        $this->assertEquals(1, self::$db->delete());
    }
}
