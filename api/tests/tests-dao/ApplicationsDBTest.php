<?php

require_once __DIR__ . '/../../src/config/enviroment.php';

use App\DAO\ApplicationsDB;
use App\Model\ApplicationModel;
use App\Model\SelectionModel;


class ApplicationsDBTest extends \PHPUnit\Framework\TestCase
{

    private SelectionModel $selection;
    private ApplicationModel $application;
    private ApplicationsDB $db;

    protected function setUp(): void
    {
        $this->application = new ApplicationModel();
        $this->application->setUserID('1');
        $this->application->setSelectionID('2');
        $this->selection = new SelectionModel();
        $this->selection->setID($this->application->getSelectionID());

        $this->db = new ApplicationsDB($this->application, $this->selection);
    }

    public function testCreate()
    {    
        parent::assertEquals(1, $this->db->create());
    }


    public function testReadListOfApplications()
    {
        $result = $this->db->getList();
        parent::assertIsArray($result);
        foreach ($result as $application) {
            parent::assertTrue($application instanceof ApplicationModel);
        }
    }

    public function testDelete()
    {
        parent::assertEquals(1, $this->db->delete());
    }
}
