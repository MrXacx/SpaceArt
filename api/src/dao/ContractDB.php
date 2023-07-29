<?php

declare(strict_types = 1);
namespace App\DAO;

require_once __DIR__.'/../../vendor/autoload.php';

use App\DAO\Abstract\DatabaseAcess;
use App\Models\ContractModel;

use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Contracts
 * 
 * @package DAO
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

   
    private ContractModel $contract;

    function __construct(ContractModel $contract){
        $this->contract = $contract;
        parent::__construct();
    }
   
    /**
     * Insere contrato na tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function create(): int{
        try{
            $this->contract->setID(parent::getRandomID()); // Gera uuid
            $details = $this->contract->getDetails(); // Obtém array de detalhes
            
            // Passa query SQL de criação
            $query = parent::getConnection()->prepare('INSERT INTO Contracts (id, hirer, hired, price, date_point, inital_time, final_time, art) VALUES (?,?,?,?,?,?,?,?)');
            
            // Substitui interrogações pelos valores dos atributos
            $query->bindValue(1, $this->contract->getID());
            $query->bindValue(2, $this->contract->getHirerID());
            $query->bindValue(3, $this->contract->getHiredID());
            $query->bindValue(4, $this->contract->getPrice());
            $query->bindValue(5, $details['date']);
            $query->bindValue(6, $details['time']['inital']);
            $query->bindValue(7, $details['time']['final']);
            $query->bindValue(8, $details['art']);
            
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa se houver alguma falha esperada
            error: throw new \RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Obtém determinada célula da tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function read(string $column): array{
        try{
            if(!static::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "\"$column\" não é uma coluna da tabela Contracts"; // Define mensagem de erro
                goto error; // Pula execução do método
            }
                
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare("SELECT id, $column FROM Contracts WHERE id = ?");
            $query->bindValue(1, $this->contract->getID()); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se consulta não falhar
                return parent::validatoreading($query); // Retorna valor que 
            }

            // Executa em caso de falhas esperadas
            error: throw new \RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            throw new \RuntimeException($ex->getMessage());
        }
    }
    
    /**
     * Obtém modelo de contrato configurado com base nos dados do banco
     * 
     * @param string $this->contract->getID() ID do contrato
     * @return UserModel Modelo do contrato
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readContract(): ContractModel{
        try{
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare('SELECT * FROM Contracts WHERE id = ?');
            $query->bindValue(1, $this->contract->getID()); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se a query for aceita
                return ContractModel::getInstaceOf(parent::validatoreading($query));
            }

            // Executa em caso de falhas esperadas
            throw new \RuntimeException('Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            throw new \RuntimeException($ex->getMessage());
        }
    }

    /**
     * Atualiza determinada célula do banco
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function update(string $column, string $value): int{
        try{
            
            if(!static::isColumn($column)){ // Executa se coluna informada não pertencer à tabela
                $message = "\"$column\" não é uma coluna da tabela Contracts"; // Define mensagem de erro
                goto error; // Pula execução do método
            }
            else if(!$this->dataValidator->isValidToFlag($column, $value)){
                return 0;
            }

            // Passa query SQL de atualização
            $query = parent::getConnection()->prepare("UPDATE Contracts SET $column = ? WHERE id = ?");

            // Substitui interrogações pelos valores das variáveis
            $query->bindValue(1, $value);
            $query->bindValue(2, $this->contract->getID());

            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa em caso de falhas esperadas
            error: throw new \RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            throw new \RuntimeException($ex->getMessage());            
        }
    }

    /**
     * Deleta contrato da tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function delete(): int{
        try{
            // Deleta seleção do banco
            $query = parent::getConnection()->prepare('DELETE FROM Contracts WHERE id = ?');
            $query->bindValue(1, $this->contract->getID());
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }
            
            throw new \RuntimeException('Operação falhou!'); // Executa em caso de falha esperada
        } catch(RuntimeException|PDOException $ex){
            throw new \RuntimeException($ex->getMessage());
        }
        
    }

    /**
     * Confere se string é compatível com alguma coluna da tabela
     * 
     * @param string Coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column):bool{
        $columns = [static::HIRER_ID, static::HIRED_ID, static::PRICE, static::ART, static::DATE, static::INITAL_TIME, static::FINAL_TIME];
        return !is_bool(array_search($column,$columns));
    }

}

?>
