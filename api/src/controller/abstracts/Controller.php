<?php

namespace App\Controller\Template;

use Symfony\Component\HttpFoundation\ParameterBag;

abstract class Controller
{

    protected ParameterBag $parameterList;

    function __construct()
    {
        $this->parameterList = \App\Server::getParameters();
    }

    protected function filterNulls(array $arr): array
    {
        return array_filter($arr, fn($value) => isset($value));
    }
}

?>