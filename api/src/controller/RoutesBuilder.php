<?php

declare(strict_types=1);

namespace App\Controller;
use FastRoute\RouteCollector;
use FastRoute\Dispatcher;





class RoutesBuilder extends \App\Controller\Server{
    private static $dispatcher;
    private array $response;

    public static function createRoutes(): void{
        static::$dispatcher = \FastRoute\simpleDispatcher(function (RouteCollector $collector) {
            $collector->addGroup('/user', function (RouteCollector $collector) {
                $collector->get('/', \App\Controller\UserRoute::class.'/queryUsualData'); // Obtém dado(s) do usuário logado
                $collector->get('/user/login', \App\Controller\UserRoute::class.'querySignInData'); // Obtém id do usuárionew App\Controller\UserController($collector);  
            });
        });
    }

    public static function isBuilded(): bool{
        return isset($dispatcher);
    }

    public function dispatch(): void{
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
                $this->response = call_user_func_array([new $class, $method], $vars);
                unset($state);
                break;
        }
    }

    public function getResponse(): array{
        return $this->response;
    }

}

?>