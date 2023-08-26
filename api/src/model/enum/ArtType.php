<?php

namespace App\Model\Enumerate;

/**
 * Enumeração de tipo de arte
 * @package App\Model\Enumerate
 * @author Ariel Santos (MrXacx)
 */
enum ArtType: string
{
    case SONG = 'música';
    case SCULPTURE = 'escultura';
    case PAINTING = 'pintura';
    case DANCE = 'dança';

}

?>
