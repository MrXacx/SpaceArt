<?php

declare(strict_types = 1);
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use App\Utils\DatabaseAcess;
use App\Tools\ExpectedException;
use App\Models\ContractModel;

use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Contracts
 * 
 * @package Utils
 * @author Ariel Santos (MrXacx)
 */
class ContractDB extends DatabaseAcess{
    /**
     * Nome da coluna de contratante
     * @var string
     */
    public const HIRER_ID = 'hirer';

    /**
     * Nome da coluna de contratado
     * @var string
     */
    public const HIRED_ID = 'hired';

    /**
     * Nome da coluna de valor de contrato
     * @var string
     */
    public const PRICE = 'price';

    /**
     * Nome da coluna de tipo de arte
     * @var string
     */
    public const ART = 'art';

    /**
     * Nome da coluna de descrição do contrato
     * @var string
     */
    public const DESCRIPTION = 'contract_description';

    /**
     * Nome da coluna de data do evento
     * @var string
     */
    public const DATE = 'date_point';

    /**
     * Nome da coluna de horário de início
     * @var string
     */
    public const INITAL_TIME = 'inital_time';

    /**
     * Nome da coluna de horário de fim
     * @var string
     */
    public const FINAL_TIME = 'final_time';

    /**
     * Insere contrato na tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function create(object $contract): int{
        try{      
            // Insere novo usuário no banco

            if(!($contract instanceof ContractModel)){ // Garante que o modelo é compatível com a classe
                $message = 'Variável passada por parâmetro é instância de ' . get_class($contract); // Define mensagem de erro
                goto error; // Pula execução do método
            }

            $contract->id = parent::getRandomID(); // Gera uuid
            $details = $contract->getDetails(); // Obtém array de detalhes
            
            // Passa query SQL de criação
            $query = parent::getConnection()->prepare('INSERT INTO Contracts (id, hirer, hired, price, date_point, inital_time, final_time, art, contract_description) VALUES (?,?,?,?,?,?,?,?,?)');
            
            // Substitui interrogações pelos valores dos atributos
            $query->bindParam(1, $contract->id);
            $query->bindParam(2, $contract->hirerID);
            $query->bindParam(3, $contract->hiredID);
            $query->bindParam(4, $contract->price);
            $query->bindParam(5, $details['date']);
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
            if(!static::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "$column não é uma coluna da tabela Contracts"; // Define mensagem de erro
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
     * Obtém modelo de contrato configurado com base nos dados do banco
     * 
     * @param string $id ID do contrato
     * @return UserModel Modelo do contrato
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readContract(string $id): ContractModel{
        try{
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare('SELECT * FROM Contracts WHERE id = ?');
            $query->bindParam(1, $id); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se a query for aceita
                return ContractModel::get(parent::validateReading($query));
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
            if(!static::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "$column não é uma coluna da tabela Contracts"; // Define mensagem de erro
                goto error; // Pula execução do método
            }

            // Passa query SQL de atualização
            $query = parent::getConnection()->prepare("UPDATE Contracts SET $column = ? WHERE id = ?");

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
     * Deleta contrato da tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function delete(string $id): int{
        try{
            // Deleta seleção do banco
            $query = parent::getConnection()->prepare('DELETE FROM Contracts WHERE id = ?');
            $query->bindParam(1, $id);
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }
            
            throw new RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
        } catch(RuntimeException|PDOException $ex){
            ExpectedException::echo($ex->getMessage(), __FILE__, __FUNCTION__, $ex->getLine());
        }
        
    }

    /**
     * Confere se string é compatível com alguma coluna da tabela
     * 
     * @param string Coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column):bool{
        $columns = [static::HIRER_ID, static::HIRED_ID, static::PRICE, static::ART, static::DESCRIPTION, static::DATE, static::INITAL_TIME, static::FINAL_TIME];
        return !is_bool(array_search($column,$columns));
    }

}

?>
