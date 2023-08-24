<?php

use App\DAO\AgreementDB;
use App\DAO\SelectionDB;
use App\DAO\UsersDB;
use App\Util\DataValidator;

/**
 * Classe de teste do serviço DataValidator
 * 
 * @package Tests
 * @see src/util/DataValidator.php
 */
class DataValidatorTest extends \PHPUnit\Framework\TestCase
{

    private DataValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new DataValidator();
    }

    public function testValidateFutureDateTime(): void
    {
        $dt = new DateTime();
        $dt->add(new DateInterval('P2D'));
        $dt->sub(new DateInterval('PT3H'));
        $this->assertTrue($this->validator->isFuture($dt->format('Y-m-d'), $dt->format('H:i')));
    }

    public function testValidateCurrentDateTime(): void
    {
        $dt = new DateTime();
        $this->assertFalse($this->validator->isFuture($dt->format('Y-m-d'), $dt->format('H:i')));
    }

    public function testValidatePastDateTime(): void
    {
        $dt = new DateTime();
        $dt->sub(new DateInterval('PT3H'));
        $this->assertFalse($this->validator->isFuture($dt->format('Y-m-d'), $dt->format('H:i')));
    }

    public function testValidateLength(): void
    {
        $this->assertTrue($this->validator->isValidVarcharLength('Churrascada', \App\DAO\UsersDB::PASSWORD));
        $this->assertFalse($this->validator->isValidVarcharLength('', \App\DAO\AgreementDB::ART));
        $this->assertFalse($this->validator->isValidVarcharLength(str_repeat('a', 256), \App\DAO\UsersDB::PASSWORD));
    }

    public function testValidateLengthWithInvalidColumn(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Coluna não encontrada');
        $this->validator->isValidVarcharLength('a', 'b');
    }

    public function testBuildDatetime(): void
    {
        $this->assertEquals('2020-07-23 17:20:00', $this->validator->buildDatetime('2020-07-23', '17:20'));
    }

    public function testBuildDatetimeWithIncorrectsParams(): void
    {
        $this->assertNull($this->validator->buildDatetime('23/07/2020', '17:20'));
        $this->assertNull($this->validator->buildDatetime('2020-07-23', '25:20'));
    }

    public function testBuildTime(): void
    {
        $this->assertEquals('08:26:00', $this->validator->buildTime('08:26'));
    }

    public function testValidatePriceWithCorrectValue(): void
    {
        $this->assertTrue($this->validator->isPrice('2752'));
        $this->assertTrue($this->validator->isPrice('0'));
    }

    public function testValidatePriceWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isPrice('1.2'));
        $this->assertFalse($this->validator->isPrice('a'));
    }

    public function testValidatePhoneWithCorrectValue(): void
    {
        $this->assertTrue($this->validator->isPhone('21986371423'));
        $this->assertTrue($this->validator->isPhone('32988033729'));
    }

    public function testValidatePhoneWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isPhone('07994628184'));
        $this->assertFalse($this->validator->isPhone('71892153472'));
        $this->assertFalse($this->validator->isPhone('45933255389'));
        $this->assertFalse($this->validator->isPhone('5933255389'));
        $this->assertFalse($this->validator->isPhone('459332553891'));
    }

    public function testValidateCEPWithCorrectValue(): void
    {
        $this->assertTrue($this->validator->isCEP('56173390'));
    }

    public function testValidateCEPWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isCEP('5617339'));
        $this->assertFalse($this->validator->isCEP('561733901'));
    }

    public function testValidateURLWithCorrectValue(): void
    {
        $this->assertTrue($this->validator->isURL('https://www.goo-gle.com.br/a/b/?teste=path%20'));
        $this->assertTrue($this->validator->isURL('https://www.google/test/?b=12'));
        $this->assertTrue($this->validator->isURL('http://www.google/test/'));
    }

    public function testValidateURLWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isURL('ahttps://www.google/test/'));
        $this->assertFalse($this->validator->isURL('https:www.google/test/'));
        $this->assertFalse($this->validator->isURL('https:www.g oogle/test/'));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/!'));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/?='));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/?a'));
        $this->assertFalse($this->validator->isURL('https://www.google.com.br/?a='));
    }

    public function testValidateDocumentNumberWithCorrectValue(): void
    {
        $this->assertTrue($this->validator->isCPF('28315572947'));
        $this->assertTrue($this->validator->isCNPJ('12829845214235'));
    }

    public function testValidateDocumentNumberWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isCNPJ('2831557294a'));
        $this->assertFalse($this->validator->isCPF('2831557294'));
        $this->assertFalse($this->validator->isCPF('283155729471'));
    }

    public function testValidateAnyColumnWithCorrectParams(): void
    {
        $this->assertTrue($this->validator->isValidToFlag(UsersDB::NAME, 'José Luís Datena'));
        $this->assertTrue($this->validator->isValidToFlag(UsersDB::CPF, '24873944813'));
        $this->assertTrue($this->validator->isValidToFlag(UsersDB::CEP, '91614582'));
        $this->assertTrue($this->validator->isValidToFlag(AgreementDB::DATE, '2023-07-01'));
        $this->assertTrue($this->validator->isValidToFlag(SelectionDB::FINAL_DATETIME, '2023-07-01 00:22'));
    }

    public function testValidateAnyColumnWithIncorrectValue(): void
    {
        $this->assertFalse($this->validator->isValidToFlag(UsersDB::NAME, ''));
        $this->assertFalse($this->validator->isValidToFlag(UsersDB::CPF, '2e483944813'));
        $this->assertFalse($this->validator->isValidToFlag(AgreementDB::DATE, '2023-12-32'));
        $this->assertFalse($this->validator->isValidToFlag(SelectionDB::FINAL_DATETIME, '2023-7-01 00:22'));
    }

    public function testValidateAnyColumnWithIncorrectFlag(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Coluna não encontrada');
        $this->validator->isValidToFlag('arroz', 'passas');
    }

    public function testValidateRate()
    {
        parent::assertTrue($this->validator->isRate(rand(0, 5)));
        parent::assertFalse($this->validator->isRate(rand(-500, -1)));
        parent::assertFalse($this->validator->isRate(rand(6, 506)));
    }
}
