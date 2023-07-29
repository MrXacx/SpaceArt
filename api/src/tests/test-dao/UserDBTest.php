<?php

namespace App\Tests;
require_once __DIR__.'/../../index.php';

use App\Models\UserModel;
use App\DAO\UserDB;
use RuntimeException;

/**
 * Classe de teste de UserDB
 * 
 * @package Tests
 * @see src/dao/UserDB.php
 */
class UserDBTest extends \PHPUnit\Framework\TestCase{
    /**
     * Objeto de manipulação de tabela
     * @var UserDB
     */
    private static UserDB $db;

    /**
     * Objeto de manipulação de usuário
     * @var UserModel
     */
    private static UserModel $user;  

     /**
     * Configura classe antes dos testes iniciarem
     */
    public static function setUpBeforeClass(): void{
        // Inicia modelo de usuário
        self::$user = new UserModel('test@example.com', 'arroz-com-passas');
        self::$user->setName('teste name 1');
        self::$user->setDocumentNumber('08000080121');
        self::$user->setCEP("21560371");
        self::$user->setPhone("00000120561");
        self::$user->setWebsite('www.exemplo.com/');

        // Inicia manipulador de tabela
        self::$db = new UserDB(self::$user);      
    }

    public function testValidColumnExists(): void{
        $this->assertTrue(UserDB::isColumn(UserDB::NAME));
    }

    public function testInvalidColumnExists(): void{
        $this->assertFalse(UserDB::isColumn('0'));
    }

    public function testCreateValidUser(): void{
        $this->assertEquals(1, self::$db->create());
    }

    public function testCreateDuplicatedUser(): void{
        $this->expectException(RuntimeException::class);
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
    public function testReadID(): void{
        $this->assertEquals(['id' => self::$user->getID()], self::$db->readID());
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testReadValidColumn(): void{

        $this->assertEquals(
            ['id' => self::$user->getID(), UserDB::EMAIL => self::$user->getEmail()],
             self::$db->read(UserDB::EMAIL)
        );
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testReadUndefinedColumn(): void{
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"a\" não é uma coluna da tabela Users");
        self::$db->read('a');
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testReadUser(): void{
        $this->assertEquals(self::$user, self::$db->readUser());
    }

    /**
     * @depends testCreateValidUser
     */
    public function testReadRestrictedUser(): void{
        $user = [
            'id' => self::$user->getID(),
            UserDB::NAME => self::$user->getName(),
            UserDB::CEP => self::$user->getCEP(),
            UserDB::SITE => self::$user->getWebsite()
        ];
        $this->assertEquals($user, (new UserDB())->readRestrictedUser($user['id']));
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testUpdateColumn(): void{
        self::$db->update(UserDB::NAME, 'Xandão da Moral',);
        $this->assertEquals(['id'=>self::$user->getID(), UserDB::NAME=>'Xandão da Moral'], self::$db->read(UserDB::NAME));
    }

    /**
     * @depends testCreateValidUser
     */
    public function testDelete(): void{
        $this->assertEquals(1, self::$db->delete());        
    }
}

?>