<?php

declare(strict_types = 1);
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use App\Utils\DatabaseAcess;
use App\Tools\ExpectedException;
use App\Models\SelectionModel;

use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Selections
 * 
 * @package Utils
 * @author Ariel Santos (MrXacx)
 */
class SelectionDB extends DatabaseAcess{

    /**
     * Insere seleção na tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function create(object $selection): int{
        try{      
            // Insere novo usuário no banco

            if(!($selection instanceof SelectionModel)){ // Garante que o modelo é compatível com a classe
                $message = 'Variável passada por parâmetro é instância de ' . get_class($selection); // Define mensagem de erro
                goto error; // Pula execução do método
            }

            $selection->id = parent::getRandomID(); // Gera uuid
            $details = $selection->getDetails(); // Obtém array de detalhes
            
            // Passa query SQL de criação
            $query = parent::getConnection()->prepare('INSERT INTO Selections (id, owner_id, price, inital_date, final_date, inital_time, final_time, art, selection_description) VALUES (?,?,?,?,?,?,?,?,?)');
            
            // Substitui interrogações pelos valores dos atributos
            $query->bindParam(1, $selection->id);
            $query->bindParam(2, $selection->ownerID);
            $query->bindParam(3, $selection->price);
            $query->bindParam(4, $details['date']['inital']);
            $query->bindParam(5, $details['date']['final']);
            $query->bindParam(6, $details['time']['inital']);
            $query->bindParam(7, $details['time']['final']);
            $query->bindParam(8, $details['art']);
            $query->bindParam(9, $details['description']);
            
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa se houver alguma falha esperada
            error: throw new RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
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
            if(!SelectionModel::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "$column não é uma coluna da tabela Selections"; // Define mensagem de erro
                goto error; // Pula execução do método
            }
                
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare("SELECT $column FROM Contracts WHERE id = ?");
            $query->bindParam(1, $id); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se consulta não falhar
                return parent::validateReading($query)[$column]; // Retorna valor que 
            }

            // Executa em caso de falhas esperadas
            error: throw new RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
    }
    
    /**
     * Obtém modelo de seleção configurado com base nos dados do banco
     * 
     * @param string $id ID da seleção
     * @return UserModel Modelo da seleção
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readSelection(string $id): SelectionModel{
        try{
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare('SELECT * FROM Selections WHERE id = ?');
            $query->bindParam(1, $id); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se a query for aceita
                return SelectionModel::get(parent::validateReading($query));
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
            if(!SelectionModel::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "$column não é uma coluna da tabela Selections"; // Define mensagem de erro
                goto error; // Pula execução do método
            }

            // Passa query SQL de atualização
            $query = parent::getConnection()->prepare("UPDATE Selections SET $column = ? WHERE id = ?");

            // Substitui interrogações pelos valores das variáveis
            $query->bindParam(1, $value);
            $query->bindParam(2, $id);

            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa em caso de falhas esperadas
            error: throw new RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());            
        }
    }

    /**
     * Deleta seleção da tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function delete(string $id): int{
        try{
            // Deleta seleção do banco
            $query = parent::getConnection()->prepare('DELETE FROM Selections WHERE id = ?');
            $query->bindParam(1, $id);
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }
            
            throw new RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
        
    }
}

?>
