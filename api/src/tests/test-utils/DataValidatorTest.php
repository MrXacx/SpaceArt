<?php

namespace App\Tests;

use App\DAO\ContractDB;
use App\DAO\SelectionDB;
use App\DAO\UserDB;
use App\Utils\DataValidator;
use DateInterval;
use DateTime;
use RuntimeException;
use SebastianBergmann\Environment\Runtime;

class DataValidatorTest extends \PHPUnit\Framework\TestCase{

    private DataValidator $validator;

    protected function setUp(): void{
        $this->validator = new DataValidator();
    }
    
    public function testValidateFutureDateTime(){
        $dt = new DateTime();
        $dt->add(new DateInterval('P2D'));
        $dt->sub(new DateInterval('PT3H'));
        parent::assertTrue($this->validator->isFuture($dt->format('Y-m-d'), $dt->format('H:i')));
    }

    public function testValidateCurrentDateTime(){
        $dt = new DateTime();
        parent::assertFalse($this->validator->isFuture($dt->format('Y-m-d'), $dt->format('H:i')));
    }

    public function testValidatePastDateTime(){
        $dt = new DateTime();
        $dt->sub(new DateInterval('PT3H'));
        parent::assertFalse($this->validator->isFuture($dt->format('Y-m-d'), $dt->format('H:i')));
    }
    
    public function testValidateLength(){
        parent::assertTrue($this->validator->isValidVarcharLength('Churrascada', \App\DAO\UserDB::PWD));
        parent::assertFalse($this->validator->isValidVarcharLength('', \App\DAO\ContractDB::ART));
        parent::assertFalse($this->validator->isValidVarcharLength(str_repeat('a', 256), \App\DAO\UserDB::PWD));
    }

    public function testValidateLengthWithInvalidColumn(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('Coluna não encontrada');
        $this->validator->isValidVarcharLength('a', 'b');
    }

    public function testBuildDatetime(){
        parent::assertEquals('2020-07-23 17:20:00', $this->validator->buildDatetime('2020-07-23', '17:20'));
    }

    public function testBuildDatetimeWithIncorrectsParams(){
        parent::assertNull($this->validator->buildDatetime('23/07/2020', '17:20'));
        parent::assertNull($this->validator->buildDatetime('2020-07-23', '25:20'));
    }

    public function testBuildTime(){
        parent::assertEquals('08:26:00', $this->validator->buildTime('08:26'));
    }

    public function testValidatePriceWithCorrectValue(){
        parent::assertTrue($this->validator->isPrice('2752'));
        parent::assertTrue($this->validator->isPrice('0'));
    }

    public function testValidatePriceWithIncorrectValue(){
        parent::assertFalse($this->validator->isPrice('1.2'));
        parent::assertFalse($this->validator->isPrice('a'));
    }
    
    public function testValidatePhoneWithCorrectValue(){
        parent::assertTrue($this->validator->isPhone('21986371423'));
        parent::assertTrue($this->validator->isPhone('32988033729'));    
    }

    public function testValidatePhoneWithIncorrectValue(){
        parent::assertFalse($this->validator->isPhone('07994628184'));
        parent::assertFalse($this->validator->isPhone('71892153472'));
        parent::assertFalse($this->validator->isPhone('45933255389'));
        parent::assertFalse($this->validator->isPhone('5933255389'));
        parent::assertFalse($this->validator->isPhone('459332553891'));
        
    }
    
    public function testValidateCEPWithCorrectValue(){
        parent::assertTrue($this->validator->isCEP('56173390'));
    }

    public function testValidateCEPWithIncorrectValue(){
        parent::assertFalse($this->validator->isCEP('5617339'));
        parent::assertFalse($this->validator->isCEP('561733901'));
    }

    public function testValidateURLWithCorrectValue(){
        parent::assertTrue($this->validator->isURL('https://www.goo-gle.com.br/a/b/?teste=path%20'));
        parent::assertTrue($this->validator->isURL('https://www.google/test/?b=12'));
        parent::assertTrue($this->validator->isURL('http://www.google/test/'));
    }
    
    public function testValidateURLWithIncorrectValue(){
        parent::assertFalse($this->validator->isURL('ahttps://www.google/test/'));
        parent::assertFalse($this->validator->isURL('https:www.google/test/'));
        parent::assertFalse($this->validator->isURL('https:www.g oogle/test/'));
        parent::assertFalse($this->validator->isURL('https://www.google.com.br/!'));
        parent::assertFalse($this->validator->isURL('https://www.google.com.br/?='));
        parent::assertFalse($this->validator->isURL('https://www.google.com.br/?a'));
        parent::assertFalse($this->validator->isURL('https://www.google.com.br/?a='));
    }
    
    public function testValidateDocumentNumberWithCorrectValue(){
        parent::assertTrue($this->validator->isDocumentNumber('28315572947'));
    }

    public function testValidateDocumentNumberWithIncorrectValue(){
        parent::assertFalse($this->validator->isDocumentNumber('2831557294a'));
        parent::assertFalse($this->validator->isDocumentNumber('2831557294'));
        parent::assertFalse($this->validator->isDocumentNumber('283155729471'));
    }

    public function testValidateAnyColumnWithCorrectParams(){
        parent::assertTrue($this->validator->isValidToFlag(UserDB::NAME, 'José Luís Datena'));
        parent::assertTrue($this->validator->isValidToFlag(UserDB::DOCUMENT_NUMBER, '24873944813'));
        parent::assertTrue($this->validator->isValidToFlag(UserDB::CEP, '91614582'));
        parent::assertTrue($this->validator->isValidToFlag(ContractDB::DATE, '2023-07-01'));
        parent::assertTrue($this->validator->isValidToFlag(SelectionDB::FINAL_DATETIME, '2023-07-01 00:22'));
    }

    public function testValidateAnyColumnWithIncorrectValue(){
        parent::assertFalse($this->validator->isValidToFlag(UserDB::NAME, ''));
        parent::assertFalse($this->validator->isValidToFlag(UserDB::DOCUMENT_NUMBER, '2e483944813'));
        parent::assertFalse($this->validator->isValidToFlag(ContractDB::DATE, '2023-12-32'));
        parent::assertFalse($this->validator->isValidToFlag(SelectionDB::FINAL_DATETIME, '2023-7-01 00:22'));
    }
    

    public function testValidateAnyColumnWithIncorrectFlag(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('Coluna não encontrada');
        $this->validator->isValidToFlag('arroz', 'passas');
    }
}

