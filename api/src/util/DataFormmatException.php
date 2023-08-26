<?php
namespace App\Util;

use RuntimeException;

class DataFormmatException extends RuntimeException{
    const LENGTH = 0;
    const FORMAT = 1;

    function __construct(string $format = '', int $code = self::FORMAT) {
       parent::__construct("Incorrect $format", $code);
    }
}

?>
