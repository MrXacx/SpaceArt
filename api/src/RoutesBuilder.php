<?php

declare(strict_types=1);

namespace App;

use Exception;
use FastRoute;
use FastRoute\RouteCollector;
use FastRoute\Dispatcher;

/**
 * Classe para controlar rotas
 */
class RoutesBuilder extends Server
{
    private static $dispatcher;
    private mixed $response;

    /**
     * Inicia as rotas da API
     */
    public static function createRoutes(): void
    {
        static::$dispatcher = FastRoute\simpleDispatcher(
            fn (RouteCollector $collector) => // Inicia rotas
                $collector->addGroup('/user', function (RouteCollector $collector)  // rotas com início "/user"
                {
                    $collector->get('/', UserController::class . '/getUnique'); // Busca todos os dados de um usuário
                    $collector->get('/list', UserController::class . '/getList'); // Busca lista de usuários
                    $collector->get('/sign-in', UserController::class . '/signIn'); // Busca id do usuário  
                    
                    $collector->delete('/', UserController::class . '/delete'); // Deleta usuário
                })
                
            );
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
                $this->response = 'NOT FOUND';
                break;
            case Dispatcher::METHOD_NOT_ALLOWED:;
                $this->response = 'METHOD NOT ALLOWED';
                break;
            case Dispatcher::FOUND:
                list($state, $handler, $vars) = $routeInfo;
                list($class, $method) = explode('/', $handler);
                
                try {
                    $response = call_user_func_array([new $class, $method], $vars);
                    $this->response = $response;
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

    public function getResponse()
    {
        return $this->response;
    }

    public function __destruct()
    {
        unset($this->response);
    }
}
?>