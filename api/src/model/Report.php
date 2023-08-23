<?php

namespace App\Model;

use App\DAO\Enumerate\ReportColumn;

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
        $entity = new Report($attr[ReportColumn::REPORTER]);

        $entity->id = $attr['id'];
        $entity->reported = $attr[ReportColumn::REPORTED];
        $entity->reason = $attr[ReportColumn::REASON];
        $entity->accepted = boolval($attr[ReportColumn::ACCEPTED]);

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

    public function getReporter(): string
    {
        return $this->id;
    }

    public function setReported(string $id): void
    {
        $this->id = $id;
    }

    public function getReported(): string
    {
        return $this->id;
    }

    public function setReason(string $reason): void
    {
        $this->reason = $reason;
    }

    public function getReason(): string
    {
        return $this->reason;
    }

    public function setAccepted(bool $accepted): void
    {
        $this->accepted = $accepted;
    }

    public function isAccepted(): bool
    {
        return $this->accepted;
    }
}
