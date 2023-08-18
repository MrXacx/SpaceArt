<?php

declare(strict_types=1);

namespace App\Controller;

use Exception;
use FastRoute\RouteCollector;
use FastRoute\Dispatcher;

/**
 * Classe para controlar rotas
 */
class RoutesBuilder extends \App\Controller\Server
{
    private static $dispatcher;
    private array $response;

    /**
     * Inicia as rotas da API
     */
    public static function createRoutes(): void
    {
        static::$dispatcher = \FastRoute\simpleDispatcher(function (RouteCollector $collector) { // Inicia rotas
            $collector->addGroup('/user', function (RouteCollector $collector) { // rotas com início "/user"
                $collector->get('/unique', \App\Controller\UserRoute::class . '/getUnique'); // Obtém dados do usuário logado
                $collector->get('/list', \App\Controller\UserRoute::class . '/getList'); // Obtém dados do usuário logado
                $collector->get('/sign-in', \App\Controller\UserRoute::class . '/signIn'); // Obtém id do usuárionew App\Controller\UserController($collector);  
            });
            
            $collector->addGroup('/agreement', function (RouteCollector $collector) { // rotas com início "/agreement"
                $collector->get('/unique', \App\Controller\AgreementRoute::class . '/getUnique');
                $collector->get('/list', \App\Controller\AgreementRoute::class . '/getList');
            });
        });
    }

    public static function isBuilded(): bool
    {
        return isset($dispatcher);
    }

    public function dispatch(): void
    {
        $routeInfo = static::$dispatcher->dispatch(parent::getHTTPMethod(), parent::getStrippedURI());

        switch ($routeInfo[0]) {
            case Dispatcher::NOT_FOUND:
                $this->response = ['NOT FOUND'];
                break;
            case Dispatcher::METHOD_NOT_ALLOWED:;
                $this->response = ['NOT ALLOWED', $routeInfo[1]];
                break;
            case Dispatcher::FOUND:
                list($state, $handler, $vars) = $routeInfo;
                list($class, $method) = explode('/', $handler);
                try {
                    $this->response['result'] = call_user_func_array([new $class, $method], $vars);
                } catch (Exception $ex) {
                    $this->response['error'] = [
                        'isRuntime' => $ex instanceof \RuntimeException,
                        'isConnection' => $ex instanceof \PDOException,
                        'message' => $ex->getMessage(),
                    ];
                }
                break;
        }
    }

    public function getResponse(): array
    {
        return $this->response;
    }
}
