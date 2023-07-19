<?php

namespace App\Tests;

require_once __DIR__.'/../../../vendor/autoload.php';

use App\Models\ContractModel;
use App\Utils\ContractDB;

class ContractModelTest extends \PHPUnit\Framework\TestCase{
    private ContractModel $contract;
    private $hirer;
    private $hired;
    private $price;
    private $date;
    private $interval;
    private $art;
    private $description;
    
    protected function setUp(): void{
        $this->hirer = '0123';
        $this->hired = '3210';
        $this->price = '75';
        $this->date = '2023/07/19';
        $this->interval = ['13:00', '14:00'];
        $this->art = 'escultura';
        $this->description = 'esculpir o monte Fuji';
    
    }
    
    public function testGetDetails(){
        $contract = new ContractModel($this->hirer, $this->hired, $this->price, $this->date, $this->interval, $this->art, $this->description);
        $details = ['date'=> $this->date, 'time' => ['inital' => $this->interval[0], 'final' => $this->interval[1]], 'art'=> $this->art, 'description' => $this->description];
        parent::assertEquals($details, $contract->getDetails());        
    }

    
    public function testGetInstanceOf(){
        $contract = new ContractModel($this->hirer, $this->hired, $this->price, $this->date, $this->interval, $this->art, $this->description);
        $contract->id = '123456789';

        $arr['id'] = '123456789';
        $arr[ContractDB::HIRER_ID] = $contract->hirerID;
        $arr[ContractDB::HIRED_ID] = $contract->hiredID;
        $arr[ContractDB::PRICE] = $contract->price;
        $arr[ContractDB::ART] = $this->art;
        $arr[ContractDB::DATE] = $this->date;
        $arr[ContractDB::INITAL_TIME] = $this->interval[0];
        $arr[ContractDB::FINAL_TIME] = $this->interval[1];
        $arr[ContractDB::DESCRIPTION] = $this->description;

        parent::assertEquals($contract, ContractModel::get($arr));
    }
}

?>