<?php

declare(strict_types = 1);
namespace App\Models;
require_once __DIR__.'/../../vendor/autoload.php';

use App\Models\Model;

class SelectionModel{
    const OWNER_ID = 'owner_id';
    const PRICE = 'price';
    const ART = 'art';
    const DESCRIPTION = 'selection_description';
    const INITAL_DATE = 'inital_date';
    const FINAL_DATE = 'final_date';
    const INITAL_TIME = 'inital_time';
    const FINAL_TIME = 'final_time';

    public string $id;
    public float $price;
    private array $details;
    public string $ownerID;

    function __construct(string $ownerID, float $price, array $date, array $interval, string $art, string $description){
        $this->ownerID = $ownerID;
        $this->price = $price;
        $this->details['date']['inital'] = $date[0];
        $this->details['date']['final'] = $date[1];
        $this->details['time']['inital'] = $interval[0];
        $this->details['time']['final'] = $interval[1];
        $this->details['art'] = $art;            
        $this->details['description'] = $description;    
    }

    public function getDetails(): array{
        return $this->details;
    }
    
    public static function isColumn(string $column):bool{
        $columns = [self::OWNER_ID, self::PRICE, self::ART, self::DESCRIPTION, self::INITAL_DATE, self::INITAL_DATE, self::INITAL_TIME, self::FINAL_TIME];
        return !is_bool(array_search($column,$columns));
    }
}

?>