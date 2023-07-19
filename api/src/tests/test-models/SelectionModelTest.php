<?php

namespace App\Tests;

require_once __DIR__.'/../../../vendor/autoload.php';

use App\Models\SelectionModel;
use App\Utils\SelectionDB;

class SelectionModelTest extends \PHPUnit\Framework\TestCase{
    private SelectionModel $selection;
    private $owner;
    private $price;
    private $date;
    private $interval;
    private $art;
    private $description;
    
    protected function setUp(): void{

        $this->owner = '0123';
        $this->price = '75';
        $this->date = ['2023-07-19', '2023-09-19'];
        $this->interval = ['13:00', '13:00'];
        $this->art = 'música';
        $this->description = 'Cantar as melhores do Raça Negra';
        $this->selection = new SelectionModel($this->owner, $this->price,$this->date, $this->interval, $this->art, $this->description);
        $this->selection->id = 'testando';
    
    }
    
    public function testGetDetails(){
        $details = ['date'=> ['inital'=>$this->date[0], 'final'=>$this->date[1]], 'time' => ['inital' => $this->interval[0], 'final' => $this->interval[1]], 'art'=> $this->art, 'description' => $this->description];
        parent::assertEquals($details, $this->selection->getDetails());        
    }

    
    public function testGetInstanceOf(){

        $arr['id'] = $this->selection->id;
        $arr[SelectionDB::OWNER_ID] = $this->selection->ownerID;
        
        $arr[SelectionDB::PRICE] = $this->selection->price;
        $arr[SelectionDB::ART] = $this->art;
        $arr[SelectionDB::INITAL_DATE] = $this->date[0];
        $arr[SelectionDB::FINAL_DATE] = $this->date[1];
        $arr[SelectionDB::INITAL_TIME] = $this->interval[0];
        $arr[SelectionDB::FINAL_TIME] = $this->interval[1];
        $arr[SelectionDB::DESCRIPTION] = $this->description;

        parent::assertEquals($this->selection, SelectionModel::get($arr));
    }
}