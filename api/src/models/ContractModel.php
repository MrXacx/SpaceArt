<?php

declare(strict_types = 1);
namespace App\Models;

class ContractModel{
    const HIRER_ID = 'hirer';
    const HIRED_ID = 'hired';
    const PRICE = 'price';
    const ART = 'art';
    const DESCRIPTION = 'contract_description';
    const DATE = 'date_point';
    const INITAL_TIME = 'inital_time';
    const FINAL_TIME = 'final_time';

    public string $id;
    public float $price;
    private array $details;
    public string $hirerID;
    public string $hiredID;

    function __construct(string $hirerID, string $hiredID, float $price, string $date, array $interval, string $art, string $description){
        $this->hirerID = $hirerID;
        $this->hiredID = $hiredID;
        $this->price = $price;
        $this->details['date'] = $date;
        $this->details['time']['inital'] = $interval[0];
        $this->details['time']['final'] = $interval[1];
        $this->details['art'] = $art;            
        $this->details['description'] = $description;    
    }

    public function getDetails(): array{
        return $this->details;
    }
    
    public static function isColumn(string $column):bool{
        $columns = [self::HIRER_ID, self::HIRED_ID, self::PRICE, self::ART, self::DESCRIPTION, self::DATE, self::INITAL_TIME, self::FINAL_TIME];
        return !is_bool(array_search($column,$columns));
    }
}

?>