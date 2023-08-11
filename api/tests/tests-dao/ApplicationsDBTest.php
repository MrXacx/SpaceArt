<?php

require_once __DIR__.'/../../src/index.php';

use App\DAO\ApplicationsDB;
use App\Model\ApplicationModel;

class ApplicationsDBTest extends \PHPUnit\Framework\TestCase{

    private ApplicationModel $application;
    private ApplicationsDB $db;

    protected function setUp(): void{
        $this->application = new ApplicationModel('2');
        $this->db = new ApplicationsDB($this->application);
    }
    
    public function testCreate(){
        $this->application->setUserID('1');
        parent::assertEquals(1, $this->db->create());
    }
    
    public function testReadColumn(){
        $this->application->setID('1');
        parent::assertEquals(['id' => '1', 'artist' => '2'], $this->db->get(ApplicationsDB::ARTIST));
    }

    public function testReadAllApplicationsToAnSelection(){
        $result = $this->db->getAllCandidates();
        parent::assertIsArray($result);
        foreach($result as $application){
            var_dump($application);
            parent::assertTrue($application instanceof ApplicationModel);
        }
    }

    public function testDelete(){
        $this->application->setUserID('1');
        parent::assertEquals(1, $this->db->delete());
    }

}
