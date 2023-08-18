<?php
require_once __DIR__ . '/../../src/config/enviroment.php';

use App\Model\Agreement;
use App\DAO\AgreementsDB;

/**
 * Classe de teste de AgreementsDB
 * 
 * @package Tests
 * @see src/dao/AgreementsDB.php
 */


class AgreementsDBTest extends \PHPUnit\Framework\TestCase
{
    /**
     * Objeto de manipulação de tabela
     * @var AgreementsDB
     */
    private static AgreementsDB $db;

    /**
     * Objeto de manipulação de contrato
     * @var Agreement
     */
    private static Agreement $agreement;

    /**
     * Configura classe antes dos testes iniciarem
     */
    public static function setUpBeforeClass(): void
    {
        // Cria modelo de teste
        self::$agreement = new Agreement();
        self::$agreement->setHirerID('1');
        self::$agreement->setHiredID('2');
        self::$agreement->setPrice(85);
        self::$agreement->setDate('2024-07-04');
        self::$agreement->setTime('07:24', '08:32');
        self::$agreement->setArt('escultura');

        self::$db = new AgreementsDB(self::$agreement);
    }

    public function testValidColumnExists(): void
    {
        $this->assertTrue(AgreementColumn::isColumn(AgreementColumn::PRICE));
    }

    public function testInvalidColumnExists(): void
    {
        $this->assertFalse(AgreementColumn::isColumn('0'));
    }

    public function testCreateValidAgreement(): void
    {
        $this->assertEquals(1, self::$db->create());
    }

    /**
     * @depends testCreateValidAgreement
     */
    public function testGetAgreement(): void
    {
        $this->assertEquals(self::$agreement, self::$db->getAgreement());
    }

    /**
     * @depends testCreateValidAgreement
     */
    public function testUpdateColumn(): void
    {
        self::$db->create(self::$agreement);
        self::$db->update(AgreementColumn::FINAL_TIME, '14:35');
        $this->assertEquals('14:35:00', self::$db->getAgreement(AgreementColumn::FINAL_TIME)->getTime()['final']);
    }

    /**
     * @depends testCreateValidAgreement
     */
    public function testUpdateInvalidColumn(): void
    {
        $col = 'b';
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("\"$col\" não é uma coluna da tabela Agreements");

        self::$db->create(self::$agreement);
        self::$db->update($col, '14:35');
    }

    /**
     * @depends testCreateValidAgreement
     */
    public function testDeletAgreement(): void
    {
        $this->assertEquals(1, self::$db->delete());
    }
}
