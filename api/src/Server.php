<?php

namespace App;

use Symfony\Component\HttpFoundation\Request;


/**
 * Classe com dados do servidor
 * @package App
 * @author Ariel Santos MrXacx (Ariel Santos)
 */
class Server
{
    /**
     * Linha padrão de início de consulta
     * @var int
     */
    const DEFAULT_OFFSET = 1;

    /**
     * Quantidade padrão de linhas máximas de retornos de consultas
     * @var int
     */
    const DEFAULT_LIMIT = 10;

    /**
     * Quantidade máxima de retornos de consultas
     * @var int
     */
    const MAX_LIMIT = 500;

    /**
     * Obtém método HTTP
     */
    public static function getHTTPMethod(): string
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Obtém URI da consulta
     * @return string
     */
    public static function getURI(): string
    {
        return $_SERVER['REQUEST_URI'];
    }

    /**
     * Obtém URI sem parâmetros
     * @return string
     */
    public static function getStrippedURI(): string
    {
        $uri = static::getURI();
        if(false !== $pos = strpos($uri, '?')){
            $uri = substr($uri, 0, $pos);
        }
        return rawurldecode($uri);
    }

    public static function getParameters(): \Symfony\Component\HttpFoundation\ParameterBag{
        return (new Request($_GET, $_POST, $_REQUEST))->attributes;
    }

}
