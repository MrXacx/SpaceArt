<?php

namespace App\Model;

use App\DAO\ApplicationsDB;

class ApplicationModel extends \App\Model\Template\Entity
{
    private string $userID;

    private string $selectionID;

    private string $lastChange;

    function setSelectionID(string $selectionID)
    {
        $this->selectionID = $selectionID;
    }

    public function getSelectionID(): string
    {
        return $this->selectionID;
    }

    public function setUserID(string $userID): void
    {
        $this->userID = $userID;
    }

    public function getUserID(): string
    {
        return $this->userID;
    }

    public function setLastChange(string $lastChange): void
    {
        $this->lastChange = $lastChange;
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new ApplicationModel();
        $entity->id = $attr['id'];
        $entity->selectionID = $attr[ApplicationsDB::SELECTION];
        $entity->userID = $attr[ApplicationsDB::ARTIST];
        $entity->lastChange = $attr[ApplicationsDB::LAST_CHANGE];

        return $entity;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'selection' => $this->selectionID,
            'user' => $this->userID ?? null,
            'last_change' => $this->lastChange ?? null,
        ]);
    }
}
