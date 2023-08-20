<?php

namespace App\Model\Enumerate;

enum AccountType: string{
    case ARTIST = 'artist';
    case ENTERPRISE = 'enterprise';

    public static function getSimilarTo(string $type): AccountType|null{
        $types = self::cases();
        $index = array_search($type, $types);
        return is_bool($index) ? null : $types[$index];
    }
}

?>