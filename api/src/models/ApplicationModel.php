<?php

namespace App\Models;

use App\DAO\ApplicationsDB;

class ApplicationModel{

    private string $id;

    private string $userID;

    private string $selectionID;

    private string $lastChange;

    function __construct(string $selectionID){
        $this->selectionID = $selectionID;
    }

    public function getSelectionID(): string{
        return $this->selectionID;
    }

    public function setID(string $id): void{
        $this->id = $id;
    }

    public function getID(): string{
        return $this->id;
    }

    public function setUserID(string $userID): void{
        $this->userID = $userID;
    }

    public function getUserID(): string{
        return $this->userID;
    }

    public function setLastChange(string $lastChange): void{
        $this->lastChange = $lastChange;
    }
    
    public static function getInstanceOf(array $attr): self{
        $model = new ApplicationModel($attr[ApplicationsDB::SELECTION]);
        $model->id = $attr['id'];
        $model->userID = $attr[ApplicationsDB::ARTIST];
        $model->lastChange = $attr[ApplicationsDB::LAST_CHANGE];
        
        return $model;
    }

    public function toArray(): array{
        return [
            'id' => $this->id ?? null,
            'selection' => $this->selectionID,
            'user' => $this->userID ?? null,
            'last_change' => $this->lastChange ?? null,
        ];
    }
}
