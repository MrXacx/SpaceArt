<?php

namespace App\Tests;

require_once __DIR__.'/../../index.php';

use App\Models\UserModel;
use App\Utils\UserDB;
use RuntimeException;

class UserDBTest extends \PHPUnit\Framework\TestCase{
    private UserDB $db;
    

    protected function setUp(): void{
        $this->db = new UserDB();      
    }

    public function testValidColumnExists(){
        parent::assertTrue(UserDB::isColumn(UserDB::NAME));
    }

    public function testInvalidColumnExists(){
        parent::assertFalse(UserDB::isColumn('0'));
    }

    public function testCreateValidUser(){
        $user = new UserModel(
            'Annabeth Chase',
            'test2@gmail.com',
            '71993257464',
            '54321',
            '123456789',
            '00123578'
        );

        parent::assertEquals(1, $this->db->create($user));
    }
    
    public function testCreateWithInvalidObject(){
        parent::expectException(RuntimeException::class);
        $this->db->create(new \DateTime());
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testDeleteUser(){
        $user = new UserModel(
            'Pelé',
            'test3@gmail.com',
            '7132912174',
            '010101',
            '123456h89',
            '00123578'
        );

        $this->db->create($user);
        parent::assertEquals(1, $this->db->delete($user->getID()));
         
    }

    /**
     * @depends testCreateValidUser
     */
    public function testCreateDuplicatedUser(){
        parent::expectException(RuntimeException::class);

        $user = new UserModel(
            'Selena Gomez',
            'test832@gmail.com',
            '45982364987',
            '010101',
            '78945612532',
            '00123578'
        );

        $this->db->create($user);
        $this->db->create($user);
       
         
    }

    /**
     * @depends testCreateValidUser
     */
    public function testReadID(){
        $user = new UserModel(
            'Rainha Elizabeth',
            'test23@gmail.com',
            '71985233574',
            '010101',         
            '45454545',
            '00123578'
        );

        $this->db->create($user);
        parent::assertEquals(['id' => $user->getID()], $this->db->readID($user->getEmail()));
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testReadValidColumn(){
        $user = new UserModel(
            'Xerxes',
            'test84@gmail.com',
            '7182644522',
            '010101',
            '1233456',
            '00123578'
        );

        $this->db->create($user);
        parent::assertEquals(
            ['id' => $user->getID(), UserDB::EMAIL => $user->getEmail()],
             $this->db->read(UserDB::EMAIL, $user->getID())
        );
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testReadUndefinedColumn(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage("\"a\" não é uma coluna da tabela Users");
        
        $user = new UserModel(
            'Xerxes',
            'test85@gmail.com',
            '21994751236',
            '010101',
            '121',
            '00123578'
        );
        
        $this->db->create($user);
        $this->db->read('a', $user->getID());
    }
    
    /**
     * @depends testCreateValidUser
     */
    public function testReadUser(){
        $user = new UserModel(
            'Neymar',
            'tests23@gmail.com',
            '7133613154',
            '010101',
            '123345',
            '00123578'
        );

        $this->db->create($user);
        parent::assertEquals(
            $user,
            $this->db->readUser($user->getID())
        );
    }

    /**
     * @depends testCreateValidUser
     */
    public function testReadUndefinedUser(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('Leitura não retornou um valor válido!');
        $this->db->readUser('0');
    }
    
    /**
     * @depends testCreateValidUser
     * @depends testValidColumnExists
     * @depends testInvalidColumnExists
     */
    public function testUpdateColumn(){
        $user = new UserModel(
            'Alexandre de Moraes',
            'xandy@gmail.com',
            '50984576217',
            '12490',
            '98632',
            '00123578'
        );

        $this->db->create($user);
        $this->db->update(UserDB::NAME, 'Xandão da Moral', $user->getID());
        parent::assertEquals(['id'=>$user->getID(), UserDB::NAME=>'Xandão da Moral'], $this->db->read(UserDB::NAME, $user->getID()));
    }
}

?>