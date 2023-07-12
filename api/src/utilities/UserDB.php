<?php

declare(strict_types = 1);
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use App\Utils\DatabaseAcess;
use App\Models\ExceptionModel;
use App\Models\UserModel;

class UserDB extends DatabaseAcess{

    public function create(object $user): int|ExceptionModel{
        // Insere novo usuário no banco
        $query = parent::getConnection()->prepare('INSERT INTO Users (id, full_name, email, pwd, document, cep) VALUES (?,?,?,?,?,?)');
        
        $user->id = parent::getRandomID();
        $query->bindParam(1, $user->id);
        $query->bindParam(2, $user->name);
        $query->bindParam(3, $user->email);
        $query->bindParam(4, $user->pwd);
        $query->bindParam(5, $user->documentNumber);
        $query->bindParam(6, $user->cep);

        return $query->execute() ? $query->rowCount() : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
        
    }

    public function read(string $column, string $id): string|ExceptionModel{
        if(UserModel::isColumn($column)){
            
            // Obtém todos os dado de uma coluna específica;
            $query = parent::getConnection()->prepare("SELECT $column FROM Users WHERE id = ?");
            $query->bindParam(1, $id);
            $query->execute();
            
            if(!$query->execute()){
                $message = 'OPERAÇÃO FALHOU!';
            }
            
            $result = $query->fetch();

            if(false === $result){
                $message = 'BUSCA SEM RETORNO!';
                $result = null;
            }
        }
        else{
            $message = "$column NÃO É UMA COLUNA DA TABELA Users";
        }
        
        return $result[$column] ?? new ExceptionModel($message, __FILE__, __FUNCTION__);
    }

    public function readID(string $email): string{
        // Obtém ID do usuário com o email inserido
        $query = parent::getConnection()->prepare('SELECT id FROM Users WHERE email = ?');
        $query->bindParam(1, $email);
        $query->execute();
        $result = $query->fetch();
        
        if(count($result) == 0){
            new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
        }
        
        return $result['id'];
    }
    
    public function readUser(string $id): array{
        // Obtém todos os dados do usuário com o id passado
        $query = parent::getConnection()->prepare('SELECT * FROM Users WHERE id = ?');
        $query->bindParam(1, $id);
        $query->execute();
        $result = $query->fetch();

        if(count($result) == 0){
            new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
        }

        return $result;
    }

    public function update(string $column, string $value, string $id): int|ExceptionModel{
        // Atualiza dado da tabela selecionada
        if(UserModel::isColumn($column)){
            $query = parent::getConnection()->prepare("UPDATE Users SET $column = ? WHERE id = ?");

            $query->bindParam(1, $value);
            $query->bindParam(2, $id);

            if(!$query->execute()){
                $message = "OPERAÇÃO FALHOU!";
            }
        }
        else{
            $message = "$column NÃO É UMA COLUNA DA TABELA Users";
        }
        
        return $query->rowCount() ?? new ExceptionModel($message, __FILE__, __FUNCTION__);
    }

    public function delete(string $id): int|ExceptionModel{
        // Deleta usuário do banco
        $query = parent::getConnection()->prepare('DELETE FROM Users WHERE id = ?');
        
        $query->bindParam(1, $id);
        $query->execute();

        return $query->execute() ? $query->rowCount() : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }

}

?>
