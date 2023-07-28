<?php

namespace App\Tests;

require_once __DIR__.'/../../index.php';

use App\Models\UserModel;
use App\DAO\UserDB;
use RuntimeException;

class UserDBTest extends \PHPUnit\Framework\TestCase{
    private static UserDB $db;  
    private static UserModel $user;  

    public static function setUpBeforeClass(): void{
        self::$user = new UserModel('test@example.com', 'arroz-com-passas');
        self::$user->setName('teste name 1');
        self::$user->setDocumentNumber('08000080121');
        self::$user->setCEP("21560371");
        self::$user->setPhone("00000120561");
        self::$user->setWebsite('www.exemplo.com/');
        self::$db = new UserDB(self::$user);      
    }

    public function testValidColumnExists(){
        parent::assertTrue(UserDB::isColumn(UserDB::NAME));
    }

    public function testInvalidColumnExists(){
        parent::assertFalse(UserDB::isColumn('0'));
    }

    public function testCreateValidUser(){
        parent::assertEquals(1, self::$db->create());
    }

    public function testCreateDuplicatedUser(){
        parent::expectException(RuntimeException::class);
        $localUser = new UserModel('test832@gmail.com', 'arroz&&passas');
        $localUser->setName('teste name 2');
        $localUser->setDocumentNumber('08000080122');
        $localUser->setCEP("21560375");
        $localUser->setPhone("00000120569");
        $localUser->setWebsite('www.exemplo.com/');
        $db = new UserDB($localUser);
        $db->create();
        $db->create();
         
    }

    /**
     * @depends testCreateValidUser
     */
    public function testReadID(){
        var_dump(self::$user->getID());
        parent::assertEquals(['id' => self::$user->getID()], self::$db->readID());
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testReadValidColumn(){

        parent::assertEquals(
            ['id' => self::$user->getID(), UserDB::EMAIL => self::$user->getEmail()],
             self::$db->read(UserDB::EMAIL)
        );
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testReadUndefinedColumn(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"a\" não é uma coluna da tabela Users");
        self::$db->read('a');
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testReadUser(){
        parent::assertEquals(self::$user, self::$db->readUser());
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testUpdateColumn(){
        self::$db->update(UserDB::NAME, 'Xandão da Moral',);
        parent::assertEquals(['id'=>self::$user->getID(), UserDB::NAME=>'Xandão da Moral'], self::$db->read(UserDB::NAME));
    }

    /**
     * @depends testCreateValidUser
     */
    public function testDelete(){
        parent::assertEquals(1, self::$db->delete());        
    }
}

?>