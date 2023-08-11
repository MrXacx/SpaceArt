<?php

namespace App\Controller;


class Server
{

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
        $uri = static::getURI();

        if (is_int($position = strpos($uri, '?'))) {
            $uri = substr($uri, 0, $position);
        }

        return rawurldecode($uri);
    }
}
