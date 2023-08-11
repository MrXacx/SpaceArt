<?php

namespace App\Model;

use App\DAO\ReportsDB;

class ReportModel{
    private string $id;
    private string $reporterID;
    private string $reportedID;
    private string $reason;
    private bool $accepted;

    function __construct(string $reporterID){
        $this->reporterID = $reporterID;
    }

    public static function getInstanceOf(array $attr): self{
        $report = new ReportModel($attr[ReportsDB::REPORTER]);

        $report->id = $attr['id'];
        $report->reportedID = $attr[ReportsDB::REPORTED];
        $report->reason = $attr[ReportsDB::REASON];
        $report->accepted = boolval($attr[ReportsDB::ACCEPTED]);

        return $report;
    }

    public function toArray(): array{
        return [
            'id' => $this->id,
            'reporter' => $this->reporterID,
            'reported' => $this->reportedID,
            'reason' => $this->reason,
            'accepted' => $this->accepted,
        ];
    }

    public function setID(string $id): void{
        $this->id = $id;
    }

    public function getID(): string{
        return $this->id;
    }

    public function getReporterID(): string{
        return $this->id;
    }
 
    public function setReportedID(string $id): void{
        $this->id = $id;
    }

    public function getReportedID(): string{
        return $this->id;
    }
 
    public function setReason(string $id): void{
        $this->id = $id;
    }

    public function getReason(): string{
        return $this->id;
    }

    public function setAccepted(bool $accepted): void{
        $this->accepted = $accepted;
    }

    public function isAccepted(): bool{
        return $this->accepted;
    }
 

}
