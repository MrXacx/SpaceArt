<?php

namespace App\Tests;

use App\Tools\DataValidater;
use DateInterval;
use DateTime;
use RuntimeException;


class DataValidaterTest extends \PHPUnit\Framework\TestCase{

    private DataValidater $validater;

    protected function setUp(): void{
        $this->validater = new DataValidater();
    }
    
    public function testValidateFutureDateTime(){
        $dt = new DateTime();
        $dt->add(new DateInterval('P2D'));
        $dt->sub(new DateInterval('PT3H'));
        parent::assertTrue($this->validater->isFuture($dt->format('d/m/Y'), $dt->format('H:i')));
    }

    public function testValidateCurrentDateTime(){
        $dt = new DateTime();
        parent::assertFalse($this->validater->isFuture($dt->format('d/m/Y'), $dt->format('H:i')));
    }

    public function testValidatePastDateTime(){
        $dt = new DateTime();
        $dt->sub(new DateInterval('PT3H'));
        parent::assertFalse($this->validater->isFuture($dt->format('d/m/Y'), $dt->format('H:i')));
    }

    public function testValidateIncorrectDate(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('A data passada por parâmetro deve seguir o seguinte modelo: DD/MM/AAAA');
        $dt = new DateTime();
        $dt->add(new DateInterval('PT3H'));
        $this->validater->isFuture('22/02/2a22', $dt->format('H:i'));
    }

    public function testValidateIncorrectTime(){
        parent::expectException(RuntimeException::class);
        parent::expectExceptionMessage('O tempo passado por parâmetro deve seguir o seguinte modelo: HH:MM');
        $dt = new DateTime();
        $dt->add(new DateInterval('PT3H'));
        $this->validater->isFuture($dt->format('d/m/Y'), '60:\'2');
    }
}

?>