<?php

declare(strict_types=1);

namespace App\Controller;

use Exception;
use FastRoute\RouteCollector;
use FastRoute\Dispatcher;

class RoutesBuilder extends \App\Controller\Server
{
    private static $dispatcher;
    private array $response;

    public static function createRoutes(): void
    {
        static::$dispatcher = \FastRoute\simpleDispatcher(function (RouteCollector $collector) {
            $collector->addGroup('/user', function (RouteCollector $collector) {
                $collector->get('/consult', \App\Controller\UserRoute::class . '/getUnique'); // Obtém dados do usuário logado
                $collector->get('/list', \App\Controller\UserRoute::class . '/getList'); // Obtém dados do usuário logado
                $collector->get('/sign-in', \App\Controller\UserRoute::class . '/signIn'); // Obtém id do usuárionew App\Controller\UserController($collector);  
            });

            //$collector->get('/contract/consult', \App\Controller\AgreementRoute::class . '/queryUsualData');
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
