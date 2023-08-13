<?php

namespace App\Controller;


class Server
{
    const DEFAULT_OFFSET = 1;
    const DEFAULT_LIMIT = 10;
    const MAX_LIMIT = 500;

    const METHOD_GET = 'GET';
    const METHOD_POST = 'POST';
    const METHOD_PUT = 'PUT';
    const METHOD_DELETE = 'DELETE';

    public static function getHTTPMethod(): string
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public static function getURI(): string
    {
        return $_SERVER['REQUEST_URI'];
    }

    public static function getStrippedURI(): string
    {
        return rawurldecode($_SERVER['PHP_SELF']);
    }
}
