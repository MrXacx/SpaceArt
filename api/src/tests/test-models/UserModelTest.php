<?php

namespace App\Tests;

require_once __DIR__.'/../../../vendor/autoload.php';
use App\Models\UserModel;
use App\Utils\UserDB;

class UserModelTest extends \PHPUnit\Framework\TestCase{
    private $name;
    private $email;
    private $pwd;
    private $documentNumber;
    private $cep;
    private $website;
    
    protected function setUp(): void{
        $this->name = 'Harry Potter';
        $this->email = 'test1@gmail.com';
        $this->pwd = '12345';
        $this->documentNumber = '123456789';
        $this->cep = '1423567';
        $this->website = 'google.com';
    
    }    
    
    public function testGetInstanceOf(){
        $user = new UserModel($this->name,$this->email, $this->website, $this->pwd, $this->documentNumber, $this->cep);
        $user->setID('012345');
        $arr['id'] = $user->getID();
        $arr[UserDB::CEP] = $user->getCEP();
        $arr[UserDB::NAME] = $user->getName();
        $arr[UserDB::EMAIL] = $user->getEmail();
        $arr[UserDB::PHONE] = $user->getPhone();
        $arr[UserDB::PWD] = $user->getPassword();
        $arr[UserDB::DOCUMENT_NUMBER] = $user->getDocumentNumber();

        parent::assertEquals($user, UserModel::get($arr));
    }
}

?>