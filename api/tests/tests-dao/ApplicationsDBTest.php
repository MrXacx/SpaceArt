<?php

require_once __DIR__ . '/../../src/config/enviroment.php';

use App\DAO\ApplicationDB;
use App\Model\Application;
use App\Model\Selection;


class ApplicationDBTest extends \PHPUnit\Framework\TestCase
{

    private Selection $selection;
    private Application $application;
    private ApplicationDB $db;

    protected function setUp(): void
    {
        $this->application = new Application();
        $this->application->setUser('1');
        $this->application->setSelection('2');
        $this->selection = new Selection();
        $this->selection->setID($this->application->getSelection());

        $this->db = new ApplicationDB($this->application, $this->selection);
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
            parent::assertTrue($application instanceof Application);
        }
    }

    public function testDelete()
    {
        parent::assertEquals(1, $this->db->delete());
    }
}
