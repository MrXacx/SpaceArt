<?php

declare(strict_types = 1);
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use App\Utils\DatabaseAcess;
use App\Tools\ExpectedException;
use App\Models\UserModel;

use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package Utils
 * @author Ariel Santos (MrXacx)
 */
class UserDB extends DatabaseAcess{

    /**
     * Insere usuário na tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function create(object $user): int{
        try{

            if(!($user instanceof UserModel)){ // Garante que o modelo é compatível com a classe
                $message = 'Variável passada por parâmetro é instância de ' . get_class($user); // Define mensagem de erro
                goto error; // Pula execução do método
            }
            
            // Passa query SQL de criação
            $query = parent::getConnection()->prepare('INSERT INTO Users (id, full_name, email, pwd, document, cep) VALUES (?,?,?,?,?,?)');
            
            $user->id = parent::getRandomID(); // Gera uuid
    
            // Substitui interrogações pelos valores dos atributos
            $query->bindParam(1, $user->id);
            $query->bindParam(2, $user->name);
            $query->bindParam(3, $user->email);
            $query->bindParam(4, $user->pwd);
            $query->bindParam(5, $user->documentNumber);
            $query->bindParam(6, $user->cep);

            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa se houver alguma falha esperada
            error: throw new RuntimeException($message ?? 'Operação falhou!');

        } catch(RuntimeException|PDOException $ex){ // Captura falhas esperadas e de query
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
        
    }

    /**
     * Obtém determinada célula da tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function read(string $column, string $id): string{
        try{
            if(!UserModel::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "$column não é uma coluna da tabela Users"; // Define mensagem de erro
                goto error; // Pula execução do método
            }
                
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare("SELECT $column FROM Users WHERE id = ?");
            $query->bindParam(1, $id); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se consulta não falhar
                return parent::validateReading($query)[$column]; // Retorna valor que 
            }
            
            error: throw new RuntimeException($message ?? 'Operação falhou!'); // Executa se alguma falha esperdada ocorrer
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
        
    }

    /**
     * Obtém ID de um usuário
     * 
     * @param string $email Email do usuário
     * @return string ID do usuário
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readID(string $email): string{
        try{
            // Passa query SQL para leitura da coluna id
            $query = parent::getConnection()->prepare('SELECT id FROM Users WHERE email = ? ');
            $query->bindParam(1, $email); // Substitui a interrogação pelo email passado
    
            if ($query->execute()){ // Executa se a query for aceita
                return parent::validateReading($query)['id'];
            }
            
            // Executa em caso de falhas esperadas
            throw new RuntimeException('Operação falhou!');
            
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
    }
    
    /**
     * Obtém modelo de usuário configurado com base nos dados do banco
     * 
     * @param string $id ID do usuário
     * @return UserModel Modelo do usuário
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readUser(string $id): UserModel{
        try{
            // Define query SQL para obter todas as colunas da linha do usuário
            $query = parent::getConnection()->prepare('SELECT * FROM Users WHERE id = ?');
            $query->bindParam(1, $id); // Substitui interrogação pelo ID

            if($query->execute()){ // Executa se a query for aceita
                return UserModel::get(parent::validateReading($query));
            }
            // Executa em caso de falhas esperadas
            throw new RuntimeException('Operação falhou!');

        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
    }

    /**
     * Atualiza determinada célula do banco
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function update(string $column, string $value, string $id): int{
        try{
            if(!UserModel::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "$column não é uma coluna da tabela Users"; // Define mensagem de erro
                goto error; // Pula execução do método
            }

            // Passa query SQL de atualização
            $query = parent::getConnection()->prepare("UPDATE Users SET $column = ? WHERE id = ?");
            
            // Substitui interrogações
            $query->bindParam(1, $value);
            $query->bindParam(2, $id);

            if($query->execute()){ // Executa em caso de sucesso na operação
                return ($query->rowCount()); // Retorna o número de linhas afetadas
            }          
            
            // Executa caso alguma falha esperada aconteça
            error: throw new RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
    }

    /**
     * Deleta usuário do banco
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function delete(string $id): int{  
        try{
            // Define a query SQL de remoção
            $query = parent::getConnection()->prepare('DELETE FROM Users WHERE id = ?');
            $query->bindParam(1, $id); // Substitui interrogação pelo ID informado
            
            if($query->execute()){ // Executa caso a query seja aceita
                return $query->rowCount(); // Retorna número de linhas apagadas
            }

            throw new RuntimeException('Operação falhou'); // Executa em caso de falha esperada

        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }

    }

}

?>
