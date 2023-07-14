<?php

declare(strict_types = 1);
namespace App\Models;

class ContractModel{
    const HIRER_ID = 'hirer';
    const HIRED_ID = 'hired';
    const PRICE = 'price';
    const ART = 'art';
    const DESCRIPTION = 'description';
    const DATE = 'date_point';
    const INTERVAL = 'time_interval';

    public string $id;
    public string $price;
    private array $details;
    public string $hirerID;
    public string $hiredID;

    function __construct(string $hirerID, string $hiredID, string $price, array $date, string $interval, string $art, string $description){
        $this->hirerID = $hirerID;
        $this->hiredID = $hiredID;
        $this->price = $price;
        $this->details['date'] = $date;
        $this->details['interval'] = $interval;            
        $this->details['art'] = $art;            
        $this->details['description'] = $description;    
    }

    public function getDetails(): array{
        return $this->details;
    }
    
    public static function isColumn(string $column):bool{
        $columns = [self::HIRER_ID, self::HIRED_ID, self::PRICE, self::ART, self::DESCRIPTION, self::DATE, self::INTERVAL];
        return !is_bool(array_search($column,$columns));
    }
}

?>