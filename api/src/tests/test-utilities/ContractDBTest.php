<?php

namespace App\Tests;

require_once __DIR__.'/../../index.php';

use App\Models\ContractModel;
use App\Utils\ContractDB;
use App\Utils\UserDB;
use RuntimeException;

class ContractDBTest extends \PHPUnit\Framework\TestCase{
    private ContractDB $db;
    private ContractModel $contract;
    

    protected function setUp(): void{
        $this->db = new ContractDB();
        $this->contract = new ContractModel('arroz', 'macarrão', '85', '2023-07-19', ['13:00', '14:00'], 'escultura', 'esculpir o monte fuji');
    }

    public function testValidColumnExists(){
        parent::assertTrue(ContractDB::isColumn(ContractDB::PRICE));
    }

    public function testInvalidColumnExists(){
        parent::assertFalse(ContractDB::isColumn('0'));
    }

    public function testCreateValidContract(){
        parent::assertEquals(1, $this->db->create($this->contract));
    }

    /**
     * @depends testCreateValidContract
     */
    public function testCreateContracWithIncorrectObject(){
        parent::expectException(RuntimeException::class);
        $this->db->create(new \DateTime());
    }

    /**
     * @depends testCreateValidContract
     */
    public function testDeletContract(){
        $this->db->create($this->contract);
        parent::assertEquals(1, $this->db->delete($this->contract->id));
    }

    /**
     * @depends testCreateValidContract
     * @depends testDeletContract
     */
    public function testDeletContractWithIncorrectID(){
        parent::assertEquals(0, $this->db->delete('a'));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadValidColumn(){
        $this->db->create($this->contract);
        parent::assertEquals(['id'=>$this->contract->id, ContractDB::PRICE=>$this->contract->price], $this->db->read(ContractDB::PRICE, $this->contract->id));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadInvalidColumn(){
        $col = 'a';
        
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");
        
        $this->db->create($this->contract);
        $this->db->read($col, $this->contract->id);
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testReadContract(){
        $this->db->create($this->contract);        
        parent::assertEquals($this->contract, $this->db->readContract($this->contract->id));
    }

    /**
     * @depends testCreateValidContract
     */
    public function testUpdateColumn(){
        $this->db->create($this->contract);        
        $this->db->update(ContractDB::FINAL_TIME, '14:35',$this->contract->id);
        parent::assertEquals(['id'=>$this->contract->id, ContractDB::FINAL_TIME=>'14:35:00'], $this->db->read(ContractDB::FINAL_TIME, $this->contract->id));
    }
    
    /**
     * @depends testCreateValidContract
     */
    public function testUpdateInvalidColumn(){
        $col = 'b';
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"$col\" não é uma coluna da tabela Contracts");

        $this->db->create($this->contract);
        $this->db->update($col, '14:35',$this->contract->id);
        
    }

}