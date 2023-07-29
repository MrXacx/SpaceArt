<?php

declare(strict_types = 1);
namespace App\DAO;

require_once __DIR__.'/../../vendor/autoload.php';

use App\DAO\Abstract\DatabaseAcess;
use App\Models\UserModel;

use PDOException;
use RuntimeException;

/**
 * Classe de maniupulação da tabela Users
 * @package DAO
 * @author Ariel Santos (MrXacx)
 */
class UserDB extends DatabaseAcess{
    /**
     * Nome da coluna de nome do usuário
     * @var string
     */
    public const NAME = 'full_name';
    
    /**
     * Nome da coluna de senha 
     * @var string
     */
    public const PWD = 'pwd';

    /**
     * Nome da coluna de senha 
     * @var string
     */
    public const PHONE = 'telphone';
    
    /**
     * Nome da coluna de cpf/cnpj
     * @var string
     */
    public const DOCUMENT_NUMBER = 'document';
    
    /**
     * Nome da coluna de email
     * @var string
     */
    public const EMAIL = 'email';
    
    /**
     * Nome da coluna de cep
     * @var string
     */
    public const CEP = 'cep';
    
    /**
     * Site do usuário
     * @var string
     */
    public const SITE = 'website';


    private UserModel $user;


    function __construct(UserModel $user){
        $this->user = $user;
        parent::__construct();
    }


    /**
     * Insere usuário na tabela
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido a conexão com o banco de dados
     */
    public function create(): int{
        try{
            
            // Passa query SQL de criação
            $query = parent::getConnection()->prepare('INSERT INTO Users (id, full_name, email, telphone, pwd, document, cep, website) VALUES (?,?,?,?,?,?,?,?)');

            $this->user->setID(parent::getRandomID());

            // Substitui interrogações pelos valores dos atributos
            $query->bindValue(1, $this->user->getID());
            $query->bindValue(2, $this->user->getName());
            $query->bindValue(3, $this->user->getEmail());
            $query->bindValue(4, $this->user->getPhone());
            $query->bindValue(5, $this->user->getPassword());
            $query->bindValue(6, $this->user->getDocumentNumber());
            $query->bindValue(7, $this->user->getCEP());
            $query->bindValue(8, $this->user->getWebsite());
            
            if($query->execute()){ // Executa se a query não falhar
                return $query->rowCount(); // Retorna linhas afetadas
            }

            // Executa se houver alguma falha esperada
            error: throw new RuntimeException($message ?? 'Operação falhou!');

        } catch(RuntimeException|PDOException $ex){ // Captura falhas esperadas e de query
            throw new RuntimeException($ex->getMessage());
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
                $message = "\"$column\" não é uma coluna da tabela Users"; // Define mensagem de erro
                goto error; // Pula execução do método
            }
                
            // Determina query SQL de leitura
            $query = parent::getConnection()->prepare("SELECT id, $column FROM Users WHERE id = ?");
            
            $query->bindValue(1, $this->user->getID()); // Substitui interrogação na query pelo ID passado
            
            if($query->execute()){ // Executa se consulta não falhar
                return parent::validatoreading($query); // Retorna valor que 
            }
            
            error: throw new RuntimeException($message ?? 'Operação falhou!'); // Executa se alguma falha esperdada ocorrer
        } catch(RuntimeException|PDOException $ex){
            throw new RuntimeException($ex->getMessage());
        }
        
    }

    /**
     * Obtém ID de um usuário
     * 
     * @param string $this->user->getEmail() Email do usuário
     * @return string ID do usuário
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readID(): array{
        try{
            // Passa query SQL para leitura da coluna id
            $query = parent::getConnection()->prepare('SELECT id FROM Users WHERE email = ? ');
            $query->bindValue(1, $this->user->getEmail()); // Substitui a interrogação pelo email passado
    
            if ($query->execute()){ // Executa se a query for aceita
                return parent::validatoreading($query);
            }
            
            // Executa em caso de falhas esperadas
            throw new RuntimeException('Operação falhou!');
            
        } catch(RuntimeException|PDOException $ex){
            throw new RuntimeException($ex->getMessage());
        }
    }
    
    /**
     * Obtém modelo de usuário configurado com base nos dados do banco
     * 
     * @param string $this->user->getID() ID do usuário
     * @return UserModel Modelo do usuário
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function readUser(): UserModel{
        try{
            // Define query SQL para obter todas as colunas da linha do usuário
            $query = parent::getConnection()->prepare('SELECT * FROM Users WHERE id = ?');
            $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID

            if($query->execute()){ // Executa se a query for aceita
                return UserModel::getInstaceOf(parent::validatoreading($query));
            }
            // Executa em caso de falhas esperadas
            throw new RuntimeException('Operação falhou!');

        } catch(RuntimeException|PDOException $ex){
            throw new RuntimeException($ex->getMessage());
        }
    }

    public static function readRestrictedUser(string $id): UserModel{
        try{
            // Define query SQL para obter todas as colunas da linha do usuário
            $query = parent::getConnection()->prepare('SELECT id, full_name, cep, website FROM Users WHERE id = ?');
            $query->bindValue(1, $id); // Substitui interrogação pelo ID

            if($query->execute()){ // Executa se a query for aceita
                return UserModel::getInstaceOf(parent::validatoreading($query));
            }
            // Executa em caso de falhas esperadas
            throw new RuntimeException('Operação falhou!');

        } catch(RuntimeException|PDOException $ex){
            throw new RuntimeException($ex->getMessage());
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
                $message = "\"$column\" não é uma coluna da tabela Users"; // Define mensagem de erro
                goto error; // Pula execução do método
            }
            else if(!$this->dataValidator->isValidToFlag($column, $value)){
                return 0;
            }

            // Passa query SQL de atualização
            $query = parent::getConnection()->prepare("UPDATE Users SET $column = ? WHERE id = ?");

            // Substitui interrogações
            $query->bindValue(1, $value);
            $query->bindValue(2, $this->user->getID());

            if($query->execute()){ // Executa em caso de sucesso na operação
                return ($query->rowCount()); // Retorna o número de linhas afetadas
            }          
            
            // Executa caso alguma falha esperada aconteça
            error: throw new RuntimeException($message ?? 'Operação falhou!');
        } catch(RuntimeException|PDOException $ex){
            throw new RuntimeException($ex->getMessage());
        }
    }

    /**
     * Deleta usuário do banco
     * 
     * @see DatabaseAcess
     * @throws RuntimeException Falha devido parâmetros incorretos ou conexão com o banco de dados
     */
    public function delete(): int{  
        try{
            // Define a query SQL de remoção
            $query = parent::getConnection()->prepare('DELETE FROM Users WHERE id = ?');
            $query->bindValue(1, $this->user->getID()); // Substitui interrogação pelo ID informado
            
            if($query->execute()){ // Executa caso a query seja aceita
                return $query->rowCount(); // Retorna número de linhas apagadas
            }

            throw new RuntimeException('Operação falhou'); // Executa em caso de falha esperada

        } catch(RuntimeException|PDOException $ex){
            throw new RuntimeException($ex->getMessage());
        }

    }

    /**
     * Confere se string é compatível com alguma coluna da tabela
     * 
     * @see DatabaseAcess
     */
    public static function isColumn(string $column):bool{
        $columns = [self::NAME, self::PWD, self::DOCUMENT_NUMBER, self::EMAIL, self::CEP, self::SITE, self::PHONE];
        return !is_bool(array_search($column,$columns));
    }

}

?>
