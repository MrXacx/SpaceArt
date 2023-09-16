<?php
namespace App\Util\Exception;

class UnexpectedHttpParameterException extends \Exception
{
    public static function throw (string $value, string $param): void
    {
        throw new UnexpectedHttpParameterException("O valor $value não é esperado pelo parâmetro $param");
    }
}

?>