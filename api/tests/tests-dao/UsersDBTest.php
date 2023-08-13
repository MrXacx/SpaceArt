<?php

require_once __DIR__ . '/../../src/config/enviroment.php';

use App\Model\User;
use App\DAO\UsersDB;

/**
 * Classe de teste de UsersDB
 * 
 * @package Tests
 * @see src/dao/UsersDB.php
 */
class UsersDBTest extends \PHPUnit\Framework\TestCase
{
    /**
     * Objeto de manipulação de tabela
     * @var UsersDB
     */
    private static UsersDB $db;

    /**
     * Objeto de manipulação de usuário
     * @var User
     */
    private static User $user;

    /**
     * Configura classe antes dos testes iniciarem
     */
    public static function setUpBeforeClass(): void
    {
        // Inicia modelo de usuário
        self::$user = new User();
        self::$user->setEmail('test@example.com');
        self::$user->setPassword('arroz-com-passas');
        self::$user->setName('teste name 1');
        self::$user->setDocumentNumber('08000080121');
        self::$user->setCEP("21560371");
        self::$user->setPhone("00000120561");

        // Inicia manipulador de tabela
        self::$db = new UsersDB(self::$user);
    }

    public function testValidColumnExists(): void
    {
        $this->assertTrue(UsersDB::isColumn(UsersDB::NAME));
    }

    public function testInvalidColumnExists(): void
    {
        $this->assertFalse(UsersDB::isColumn('0'));
    }

    public function testCreateValidUser(): void
    {
        $this->assertEquals(1, self::$db->create());
    }

    public function testCreateDuplicatedUser(): void
    {
        $this->expectException(RuntimeException::class);
        $localUser = new User();
        $localUser->setEmail('test832@gmail.com');
        $localUser->setPassword('arroz&&passas');
        $localUser->setName('teste name 2');
        $localUser->setDocumentNumber('08000080122');
        $localUser->setCEP("21560375");
        $localUser->setPhone("00000120569");

        $db = new UsersDB($localUser);
        $db->create();
        $db->create();
    }

    /**
     * @depends testCreateValidUser
     */
    public function testGetID(): void
    {
        $this->assertEquals(['id' => self::$user->getID()], self::$db->getID());
    }

    /**
     * @depends testCreateValidUser
     */
    public function testGetUser(): void
    {
        $this->assertEquals(self::$user->toArray(), self::$db->getUser()->toArray());
    }

    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testUpdateColumn(): void
    {
        self::$db->update(UsersDB::NAME, 'Xandão da Moral',);
        $this->assertEquals('Xandão da Moral', self::$db->getUser()->getName());
    }

    /**
     * @depends testCreateValidUser
     */
    public function testDelete(): void
    {
        $this->assertEquals(1, self::$db->delete());
    }
}
