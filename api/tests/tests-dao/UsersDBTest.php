<?php

require_once __DIR__.'/../../src/index.php';

use App\Models\UserModel;
use App\DAO\UsersDB;

/**
 * Classe de teste de UsersDB
 * 
 * @package Tests
 * @see src/dao/UsersDB.php
 */
class UsersDBTest extends \PHPUnit\Framework\TestCase{
    /**
     * Objeto de manipulação de tabela
     * @var UsersDB
     */
    private static UsersDB $db;

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
        self::$db = new UsersDB(self::$user);      
    }

    public function testValidColumnExists(): void{
        $this->assertTrue(UsersDB::isColumn(UsersDB::NAME));
    }

    public function testInvalidColumnExists(): void{
        $this->assertFalse(UsersDB::isColumn('0'));
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
        $db = new UsersDB($localUser);
        $db->create();
        $db->create();
         
    }

    /**
     * @depends testCreateValidUser
     */
    public function testGetID(): void{
        $this->assertEquals(['id' => self::$user->getID()], self::$db->getID());
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testGetValidColumn(): void{

        $this->assertEquals(
            ['id' => self::$user->getID(), UsersDB::EMAIL => self::$user->getEmail()],
             self::$db->get(UsersDB::EMAIL)
        );
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testGetUndefinedColumn(): void{
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"a\" não é uma coluna da tabela Users");
        self::$db->get('a');
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testGetUser(): void{
        $this->assertEquals(self::$user, self::$db->getUser());
    }

    /**
     * @depends testCreateValidUser
     */
    public function testGetRestrictedUser(): void{
        $user = [
            'id' => self::$user->getID(),
            UsersDB::NAME => self::$user->getName(),
            UsersDB::CEP => self::$user->getCEP(),
            UsersDB::SITE => self::$user->getWebsite()
        ];
        $this->assertEquals($user, (new UsersDB())->getRestrictedUser($user['id']));
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testUpdateColumn(): void{
        self::$db->update(UsersDB::NAME, 'Xandão da Moral',);
        $this->assertEquals(['id'=>self::$user->getID(), UsersDB::NAME=>'Xandão da Moral'], self::$db->get(UsersDB::NAME));
    }

    /**
     * @depends testCreateValidUser
     */
    public function testDelete(): void{
        $this->assertEquals(1, self::$db->delete());        
    }
}

?>