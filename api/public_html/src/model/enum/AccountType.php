<?php

namespace App\Model\Enumerate;

/**
 * Enumeração de tipo de conta
 * @package App\Model\Enumerate
 * @author Ariel Santos (MrXacx)
 */
enum AccountType: string
{
    case ARTIST = 'artist';
    case ENTERPRISE = 'enterprise';
}
