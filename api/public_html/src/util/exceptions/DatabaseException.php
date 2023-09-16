<?php
namespace App\Util\Exception;

class DatabaseException extends \Exception
{
    public static function throw (string $message): void
    {
        $exception =  new DatabaseException($message);
        $exception->code = (int)substr($message,17,4);
        throw $exception;
    }
}

?>