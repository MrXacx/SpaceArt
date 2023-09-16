<?php

namespace App\Controller\Tool;

use App\Server;
use App\Util\Cache;
use Symfony\Component\HttpFoundation\ParameterBag;

trait Controller
{
    public static Cache $cache;

    private ParameterBag $parameterList;

    function __construct()
    {
        $this->parameterList = Server::getParameters();
    }

    private function filterNulls(array $arr): array
    {
        return array_filter($arr, fn($value) => isset($value));
    }

    private function fetchListOffset(): int{
        $offset = $this->parameterList->getInt('offset'); // Obtém posição de início da leitura

        if ($offset < Server::DEFAULT_OFFSET) { // Executa se o offset for menor que o valor padrão
            $offset = Server::DEFAULT_OFFSET;
        }
        return $offset;
    }

    protected function fetchListLimit(): int{
        $limit = $this->parameterList->getInt('limit', 10); // Obtém máximo de elementos da leitura

        if ($limit <= 0 || $limit > Server::MAX_LIMIT) { // Executa se o limite for nulo, negativo ou ultrapassar o valor máximo
            $limit = Server::DEFAULT_LIMIT;
        }
        return $limit;
    }
}

?>