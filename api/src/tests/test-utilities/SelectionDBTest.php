<?php

namespace App\Tests;

require_once __DIR__.'/../../index.php';

use App\Models\SelectionModel;
use App\Utils\SelectionDB;
use RuntimeException;

class SelectionDBTest extends \PHPUnit\Framework\TestCase{
    private SelectionDB $db;
    private SelectionModel $selection;
    

    protected function setUp(): void{
        $this->db = new SelectionDB();
        $this->selection = new SelectionModel('12345', '85', ['2023-03-01', '2025-07-02'], ['00:00', '00:00'], 'pintura', 'Pintar a monalisa numa parede');
    }

    public function testValidColumnExists(){
        parent::assertTrue(SelectionDB::isColumn(SelectionDB::DESCRIPTION));
    }

    public function testInvalidColumnExists(){
        parent::assertFalse(SelectionDB::isColumn('DESC'));
    }

    public function testCreateValidSelection(){
        parent::assertEquals(1, $this->db->create($this->selection));
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testCreateContracWithIncorrectObject(){
        parent::expectException(RuntimeException::class);
        $this->db->create(new \App\Utils\UserDB());
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testDeletSelection(){
        $this->db->create($this->selection);
        parent::assertEquals(1, $this->db->delete($this->selection->id));
    }

    /**
     * @depends testCreateValidSelection
     * @depends testDeletSelection
     */
    public function testDeletSelectionWithIncorrectID(){
        parent::assertEquals(0, $this->db->delete('123345'));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadValidColumn(){
        $this->db->create($this->selection);
        parent::assertEquals(['id'=>$this->selection->id, SelectionDB::INITAL_DATE=>$this->selection->getDetails()['date']['inital']], $this->db->read(SelectionDB::INITAL_DATE, $this->selection->id));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadInvalidColumn(){
        $col = 'a';
        
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");
        
        $this->db->create($this->selection);
        $this->db->read($col, $this->selection->id);
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testReadSelection(){
        $this->db->create($this->selection);        
        parent::assertEquals($this->selection, $this->db->readSelection($this->selection->id));
    }

    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateColumn(){
        $this->db->create($this->selection);        
        $this->db->update(SelectionDB::ART, 'dança',$this->selection->id);
        parent::assertEquals(['id'=>$this->selection->id, SelectionDB::ART=>'dança'], $this->db->read(SelectionDB::ART, $this->selection->id));
    }
    
    /**
     * @depends testCreateValidSelection
     */
    public function testUpdateInvalidColumn(){
        $col = 'b';
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Selections");

        $this->db->create($this->selection);
        $this->db->update($col, '14:35',$this->selection->id);
        
    }

}

?>