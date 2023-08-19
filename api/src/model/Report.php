<?php

namespace App\Model;

use App\DAO\Enumerate\ReportColumn;

class Report extends \App\Model\Template\Entity
{
    private string $reporterID;
    private string $reportedID;
    private string $reason;
    private bool $accepted;

    function __construct(string $reporterID)
    {
        $this->reporterID = $reporterID;
        parent::__construct();
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Report($attr[ReportColumn::REPORTER]);

        $entity->id = $attr['id'];
        $entity->reportedID = $attr[ReportColumn::REPORTED];
        $entity->reason = $attr[ReportColumn::REASON];
        $entity->accepted = boolval($attr[ReportColumn::ACCEPTED]);

        return $entity;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'reporter' => $this->reporterID,
            'reported' => $this->reportedID,
            'reason' => $this->reason,
            'accepted' => $this->accepted,
        ]);
    }

    public function getReporterID(): string
    {
        return $this->id;
    }

    public function setReportedID(string $id): void
    {
        $this->id = $id;
    }

    public function getReportedID(): string
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
