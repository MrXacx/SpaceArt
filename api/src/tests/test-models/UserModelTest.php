<?php

namespace App\Tests;

require_once __DIR__.'/../../../vendor/autoload.php';
use App\Models\UserModel;
use App\Utils\UserDB;

class UserModelTest extends \PHPUnit\Framework\TestCase{
    private UserModel $user;
    private $name;
    private $email;
    private $pwd;
    private $documentNumber;
    private $cep;
    
    protected function setUp(): void{
        $this->name = 'Harry Potter';
        $this->email = 'test1@gmail.com';
        $this->pwd = '12345';
        $this->documentNumber = '123456789';
        $this->cep = '1423567';
    
    }
    
    public function testCreateUser(){
        $user = new UserModel($this->name,$this->email,$this->pwd, $this->documentNumber, $this->cep);   
        
        parent::assertEquals($this->name, $user->name);
        parent::assertEquals($this->email, $user->email);
        parent::assertEquals($this->pwd, $user->pwd);
        parent::assertEquals($this->documentNumber, $user->documentNumber);
        parent::assertEquals($this->cep, $user->cep);
        
    }
    
    
    public function testGetFollowingList(){
        $list = ['a', 'b',  'c', 'd'];

        $user = new UserModel($this->name,$this->email,$this->pwd, $this->documentNumber, $this->cep);   
        $user->setFollowingList($list);
        
        parent::assertEquals($list, $user->getFollowingList());
    }
    
    /**
     * @dependes testGetFollowingList
     */
    public function testAddFollowingList(){
        $user = new UserModel($this->name,$this->email,$this->pwd, $this->documentNumber, $this->cep);   
        $list = ['a', 'b', 'c', 'd'];
        $user->setFollowingList($list);
        $user->addFollowing('e');
        $list[] = 'e';
        parent::assertEquals($list, $user->getFollowingList());
    }

    /**
     * @dependes testGetFollowingList
     */
    public function testRemoveFollowingList(){
        $user = new UserModel($this->name,$this->email,$this->pwd, $this->documentNumber, $this->cep);   
        $list = ['a', 'b', 'c', 'd'];
        $user->setFollowingList($list);
        $user->removeFollowing('a');
        parent::assertEquals(array_slice($list, 1), $user->getFollowingList());
        
    }
    
    public function testGetInstanceOf(){
        $user = new UserModel($this->name,$this->email,$this->pwd, $this->documentNumber, $this->cep);

        $arr['id'] = $user->id;
        $arr[UserDB::CEP] = $user->cep;
        $arr[UserDB::NAME] = $user->name;
        $arr[UserDB::EMAIL] = $user->email;
        $arr[UserDB::PWD] = $user->pwd;
        $arr[UserDB::DOCUMENT_NUMBER] = $user->documentNumber;

        parent::assertEquals($user, UserModel::get($arr));
    }
}

?>