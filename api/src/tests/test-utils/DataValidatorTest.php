<?php

namespace App\Tests;

use App\Utils\DataValidator;
use DateInterval;
use DateTime;
use RuntimeException;


class DataValidatorTest extends \PHPUnit\Framework\TestCase{

    /**
     * todo: validar comprimentos dos atributos de UserModel
     */

    private DataValidator $validator;

    protected function setUp(): void{
        $this->validator = new DataValidator();
    }
    
    public function testValidateFutureDateTime(){
        $dt = new DateTime();
        $dt->add(new DateInterval('P2D'));
        $dt->sub(new DateInterval('PT3H'));
        parent::assertTrue($this->validator->isFuture($dt->format('d/m/Y'), $dt->format('H:i')));
    }

    public function testValidateCurrentDateTime(){
        $dt = new DateTime();
        parent::assertFalse($this->validator->isFuture($dt->format('d/m/Y'), $dt->format('H:i')));
    }

    public function testValidatePastDateTime(){
        $dt = new DateTime();
        $dt->sub(new DateInterval('PT3H'));
        parent::assertFalse($this->validator->isFuture($dt->format('d/m/Y'), $dt->format('H:i')));
    }

    public function testValidateIncorrectDate(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('A data passada por parâmetro deve seguir o seguinte modelo: DD/MM/AAAA');
        $dt = new DateTime();
        $dt->add(new DateInterval('PT3H'));
        $this->validator->isFuture('22/02/2a22', $dt->format('H:i'));
    }

    public function testValidateIncorrectTime(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('O horário passado por parâmetro deve seguir o seguinte modelo: HH:MM');
        $dt = new DateTime();
        $dt->add(new DateInterval('PT3H'));
        $this->validator->isFuture($dt->format('d/m/Y'), '60:\'2');
    }
    
    public function testValidateLength(){
        parent::assertTrue($this->validator->validateVarcharLength('Churrascada', \App\DAO\UserDB::PWD));
        parent::assertFalse($this->validator->validateVarcharLength('', \App\DAO\ContractDB::ART));
        parent::assertFalse($this->validator->validateVarcharLength(str_repeat('a', 256), \App\DAO\UserDB::PWD));
    }

    public function testValidateLengthWithInvalidColumn(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('Coluna não encontrada');
        $this->validator->validateVarcharLength('a', 'b');
    }

    public function testBuildDatetime(){
        parent::assertEquals('2020-07-23 17:20:00', $this->validator->buildDatetime('23/07/2020', '17:20'));
    }

    public function testBuildDatetimeWithIncorrectsParams(){
        parent::assertNull($this->validator->buildDatetime('23/07-2020', '17:20'));
        parent::assertNull($this->validator->buildDatetime('23/07/2020', '25:20'));
    }

    public function testBuildDate(){
        parent::assertEquals('2002-08-25', $this->validator->buildDate('25/08/2002'));
    }

    public function testBuildTime(){
        parent::assertEquals('08:26:00', $this->validator->buildTime('08:26'));
    }

    public function testValidatePrice(){
        parent::assertTrue($this->validator->validatePrice('2752'));
        parent::assertTrue($this->validator->validatePrice('0'));
        parent::assertFalse($this->validator->validatePrice('1.2'));
        parent::assertFalse($this->validator->validatePrice('a'));
    }
}

?>