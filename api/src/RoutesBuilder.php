<?php

declare(strict_types=1);

namespace App;

use Exception;
use FastRoute;
use FastRoute\RouteCollector;
use FastRoute\Dispatcher;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe para controlar rotas
 */
class RoutesBuilder extends Server
{
    private static $dispatcher;

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
                    $collector->post('/', UserController::class . '/create'); // Busca id do usuário  
                    $collector->put('/', UserController::class . '/update'); // Busca id do usuário     
                    $collector->delete('/', UserController::class . '/delete'); // Deleta usuário
                });
                $collector->addGroup('/chat', function (RouteCollector $collector)  // rotas com início "/user"
                {
                    $collector->get('/', UserController::class . '/'); //Abre o menu de chats
                    $collector->get('/conversation', UserController::class . '/'); //Abre a conversa selecionada
                    $collector->get('/conversation/list', UserController::class . '/'); //Abre a conversa selecionada
                    $collector->post('/conversation', UserController::class . '/'); //Cria um chat novo
                    $collector->delete('/conversation', UserController::class . '/'); //Deleta um chat existente
                    $collector->put('/conversation', UserController::class . '/'); //Atualiza as informações do chat
                });
                $collector->addGroup('/contract', function (RouteCollector $collector)  //rotas com início '/contract'
                {
                    $collector->get('/rate', UserController::class . '/'); //Abre o menu de avaliação
                    $collector->delete('/rate', UserController::class . '/'); //Deleta a avaliação
                    $collector->put('/rate', UserController::class . '/'); //Atualiza as informações da avaliação
                    $collector->post('/rate', UserController::class . '/'); //Cria uma nova avaliação
                    $collector->get('/', UserController::class . '/'); //Abre o menu de contratos
                    $collector->get('/list', UserController::class . '/'); //Abre um canto específico
                    $collector->delete('/', UserController::class . '/'); //Deleta um contrato
                    $collector->put('/', UserController::class . '/'); //Atualiza as informações do contrato
                    $collector->post('/', UserController::class . '/'); //Cria um contrato
                    
                });
                $collector->addGroup('/selection', function (RouteCollector $collector)  //rotas com início '/contract'
                {
                    $collector->get('/list', UserController::class . '/'); //Abre o menu de criação de vaga
                    $collector->get('/', UserController::class . '/'); //Abre uma vaga em específico
                    $collector->delete('/', UserController::class . '/'); //Deleta uma vaga
                    $collector->put('/', UserController::class . '/'); //Atualiza as informações de uma vaga
                    $collector->post('/', UserController::class . '/'); //Cria uma vaga
                    
                });
                $collector->addGroup('/application', function (RouteCollector $collector)  //rotas com início '/application'
                {
                    $collector->get('/list', UserController::class . '/'); //Abre o menu de candidatura
                    $collector->get('/', UserController::class . '/'); //Abre uma vaga em específico
                    $collector->delete('/', UserController::class . '/'); //Deleta uma candidatura
                    $collector->post('/', UserController::class . '/'); //Cria uma candidatura
                    
                });
                
            );
    }

    /**
     * Obtém dados da rota executada
     * @return array vetor com todas as informações disponíveis da rota
     */
    public function dispatch(): array
    {
        return static::$dispatcher->dispatch(parent::getHTTPMethod(), parent::getStrippedURI());
    }


    /**
     * Busca resposta para a rota executada
     * @param Response Objeto manipulador de resposta
     * @param array informações da rota
     */
    public function fetchResponse(Response $responseHandler, array $fetchParams): void
    {
        // Obtém status da consulta à rota
        $status = $fetchParams[0];
        unset($fetchParams[0]);
        
        // Busca callback para o status da requisição
        switch ($status) {

            case Dispatcher::NOT_FOUND: // Caso a rota seja desconhecida
                $responseHandler->setStatusCode(Response::HTTP_NOT_FOUND);
                return;

            case Dispatcher::METHOD_NOT_ALLOWED: // Caso a rota seja conhecida, mas não esteja esperando o método utilizado
                $responseHandler->setStatusCode(Response::HTTP_METHOD_NOT_ALLOWED);
                return;

            case Dispatcher::FOUND: // Caso a rota esteja correta

                list($handler, $vars) = $fetchParams; // Obtém manipulador da rota e parâmetros de manipulação
                list($class, $method) = explode('/', $handler); // Obtém classe e método a ser executado
                
                try {
                    $content = call_user_func_array([new $class, $method], $vars); // Instancia classe e chama o método passando os parâmetros retornados pela rota

                    if ($content) { // Executa caso o retorno seja true

                        $status = match (parent::getHTTPMethod()) { // Obtém código HTTP adequado
                            'DELETE', 'PUT' => Response::HTTP_NO_CONTENT, // Funcionou, mas não retorna dados
                            'POST' => Response::HTTP_CREATED // Novo recurso disponível
                        };
                        $responseHandler->setStatusCode($status); // Define o status da resposta
                    } else if (is_array($content)) { // Executa caso o conteúdo obtido seja um vetor

                        $responseHandler->setStatusCode(Response::HTTP_OK); // Funcionou e retorna conteúdo
                        $responseHandler->setContent(json_encode($content, JSON_INVALID_UTF8_IGNORE)); // Define conteúdo a ser repondido ao cliente
                    } else { // Caso a execução falhe

                        $responseHandler->setStatusCode(Response::HTTP_BAD_REQUEST); // Erro na requisição
                    }

                } catch (Exception $ex) {
                    // Define status de falha como erro de requisição exclusivamente em casos de execeções de Runtime
                    $status = $ex instanceof RuntimeException ? Response::HTTP_BAD_REQUEST : Response::HTTP_INTERNAL_SERVER_ERROR;
                    $responseHandler->setStatusCode($status);
                }    
                
        
            }

    }

}
?>
