<?php

use App\DAO\AgreementDB;
use App\DAO\ArtistDB;
use App\DAO\EnterpriseDB;
use App\DAO\SelectionDB;
use App\DAO\UsersDB;
use App\Util\DataValidator;
use PHPUnit\Framework\TestCase as Test;
/**
 * Classe de teste do serviço DataValidator
 * 
 * @package Tests
 * @see src/util/DataValidator.php
 */
class DataValidatorTest extends Test
{

    private DataValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new DataValidator;
    }

    public function testValidateLength(): void
    {
        $this->assertTrue($this->validator->isFit('Churrascada', UsersDB::PASSWORD));
        $this->assertFalse($this->validator->isFit('', AgreementDB::ART));
        $this->assertFalse($this->validator->isFit(str_repeat('a', 256), UsersDB::PASSWORD));
    }

    public function testValidateCorrectPhone(): void
    {
        $this->assertTrue($this->validator->isPhone('21986371423'));
        $this->assertTrue($this->validator->isPhone('32988033729'));
    }

    public function testValidateIncorrectPhone(): void
    {
        $this->assertFalse($this->validator->isPhone('07994628184'));
        $this->assertFalse($this->validator->isPhone('71892153472'));
        $this->assertFalse($this->validator->isPhone('45933255389'));
        $this->assertFalse($this->validator->isPhone('5933255389'));
        $this->assertFalse($this->validator->isPhone('459332553891'));
    }

    public function testValidateCorrectCEP(): void
    {
        $this->assertTrue($this->validator->isCEP('56173390'));
    }

    public function testValidateIncorrectCEP(): void
    {
        $this->assertFalse($this->validator->isCEP('5617339'));
        $this->assertFalse($this->validator->isCEP('561733901'));
    }

    public function testValidateCorrectURL(): void
    {
        $this->assertTrue($this->validator->isURL('https://www.goo-gle.com.br/a/b/?teste=path%20'));
        $this->assertTrue($this->validator->isURL('https://www.google/test/?b=12'));
        $this->assertTrue($this->validator->isURL('http://www.google/test/'));
    }

    public function testValidateIncorrectURL(): void
    {
        $this->assertFalse($this->validator->isURL('ahttps://www.google/test/'));
        $this->assertFalse($this->validator->isURL('https:www.google/test/'));
        $this->assertFalse($this->validator->isURL('https:www.g oogle/test/'));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/!'));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/?='));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/?a'));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/?a='));
    }

    public function testValidateCorrectCPF(): void
    {
        $this->assertTrue($this->validator->isCPF('28315572947'));
    }

    public function testValidateincorrectCPF(): void
    {

        $this->assertFalse($this->validator->isCPF('2831557294'));
        $this->assertFalse($this->validator->isCPF('283155729471'));
    }
    public function testValidateCorrectCNPJ(): void
    {
        $this->assertTrue($this->validator->isCNPJ('12829845214235'));
    }

    public function testValidateIncorrectCNPJ(): void
    {
        $this->assertFalse($this->validator->isCNPJ('2831557294a'));
    }

    public function testValidateCorrectEmail(): void{
        $this->assertTrue($this->validator->isEmail('email@gmail.com'));
        $this->assertTrue($this->validator->isEmail('email@gmail.org.br'));
        $this->assertTrue($this->validator->isEmail('email12@[127.0.0.1].com'));
    }
    public function testValidateIncorrectEmail(): void{
        $this->assertFalse($this->validator->isEmail('email@@gmail.com'));
        $this->assertFalse($this->validator->isEmail('emáil@gmail.com'));
        $this->assertFalse($this->validator->isEmail('email@'));
        $this->assertFalse($this->validator->isEmail('email@.com'));
        $this->assertFalse($this->validator->isEmail('email@ .com'));
    }

    public function testValidateAnyColumnWithCorrectValue(): void
    {
        $this->assertTrue($this->validator->isValidToFlag('José Luís Datena', UsersDB::NAME));
        $this->assertTrue($this->validator->isValidToFlag('24873944813', ArtistDB::CPF));
        $this->assertTrue($this->validator->isValidToFlag('91614582', EnterpriseDB::CEP));
        $this->assertTrue($this->validator->isValidToFlag('01/07/2023', AgreementDB::DATE));
        $this->assertTrue($this->validator->isValidToFlag('01/07/2023 00:22:25', SelectionDB::FINAL_DATETIME));
    }

    public function testValidateAnyColumnWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isValidToFlag('', UsersDB::NAME));
        $this->assertFalse($this->validator->isValidToFlag('2e483944813', ArtistDB::CPF));
        $this->assertFalse($this->validator->isValidToFlag('2023-12-32', AgreementDB::DATE));
        $this->assertFalse($this->validator->isValidToFlag('2023-7-01 00:22', SelectionDB::FINAL_DATETIME));
    }
}