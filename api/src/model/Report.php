<?php

namespace App\Model;

use App\DAO\ReportDB;
use App\Util\DataFormmatException;

class Report extends \App\Model\Template\Entity
{
    private string $reporter;
    private string $reported;
    private string $reason;
    private bool $accepted;

    function __construct(string $reporter)
    {
        $this->reporter = $reporter;
        parent::__construct();
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Report($attr[ReportDB::REPORTER]);

        $entity->id = $attr['id'];
        $entity->reported = $attr[ReportDB::REPORTED];
        $entity->reason = $attr[ReportDB::REASON];
        $entity->accepted = boolval($attr[ReportDB::ACCEPTED]);

        return $entity;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'reporter' => $this->reporter,
            'reported' => $this->reported,
            'reason' => $this->reason,
            'accepted' => $this->accepted,
        ]);
    }

    /**
     * Obtém id do denunciador
     * @return string
     */
    public function getReporter(): string
    {
        return $this->reporter;
    }

    /**
     * Define id do denunciado
     * @param string
     */
    public function setReported(string $reporter): void
    {
        $this->reporter = $reporter;
    }

    /**
     * Obtém id do denunciado
     * @return string
     */
    public function getReported(): string
    {
        return $this->reported;
    }

    /**
     * Define razão da denúncia
     * @param string
     */
    public function setReason(string $reason): void
    {
        $this->reason = $this->validator->isFit($reason) ? $reason : throw new DataFormmatException('reason', DataFormmatException::LENGTH);
    }

    /**
     * Obtém razão da denúncia
     * @return string
     */
    public function getReason(): string
    {
        return $this->reason;
    }

    /**
     * Define se a denúncia foi aceita
     * @param bool
     */
    public function setAccepted(bool $accepted): void
    {
        $this->accepted = $accepted;
    }

    /**
     * Retorna se a denuncia foi aceita
     * @param string
     */
    public function isAccepted(): bool
    {
        return $this->accepted;
    }
}
