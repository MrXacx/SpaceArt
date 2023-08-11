<?php

header('Content-Type: application/json');

include_once __DIR__ . '/config/enviroment.php';
require_once __DIR__ . '/../vendor/autoload.php';

$_ENV = array_merge($_ENV, getDatabaseSettings());

/*use App\Controller\RoutesBuilder;

if(!RoutesBuilder::isBuilded()){
    RoutesBuilder::createRoutes();
}

$routes = new RoutesBuilder();
$routes->dispatch();

$response = $routes->getResponse();
*/

$model = new \App\Model\UserModel();
$model->setName('Claudio');
$model->setPassword('12345678');
$model->setEmail('claudio@gmail.com');
$model->setDocumentNumber('24237056985');
$model->setCEP('41502780');

$db = new \App\DAO\UsersDB($model);
$db->create();

echo json_encode($db->getUser()->toArray());