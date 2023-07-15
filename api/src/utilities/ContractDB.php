<?php

declare(strict_types = 1);
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use App\Utils\DatabaseAcess;
use App\Models\ExceptionModel;
use App\Models\ContractModel;

class ContractDB extends DatabaseAcess{

    public function create(object $contract): int|ExceptionModel{
        // Insere novo usuário no banco
        $contract->id = parent::getRandomID();
        $details = $contract->getDetails();

        $query = parent::getConnection()->prepare('INSERT INTO Contracts (id, hirer, hired, price, date_point, inital_time, final_time, art, contract_description) VALUES (?,?,?,?,?,?,?,?,?)');
        
        $query->bindParam(1, $contract->id);
        $query->bindParam(2, $contract->hirerID);
        $query->bindParam(3, $contract->hiredID);
        $query->bindParam(4, $contract->price);

        $query->bindParam(5, $details['date']);
        $query->bindParam(6, $details['time']['inital']);
        $query->bindParam(7, $details['time']['final']);
        $query->bindParam(8, $details['art']);
        $query->bindParam(9, $details['description']);

        return $query->execute() ? $query->rowCount() : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }

    public function read(string $column, string $id): string|ExceptionModel{
        if(ContractModel::isColumn($column)){
            
            // Obtém todos os dado de uma coluna específica;
            $query = parent::getConnection()->prepare("SELECT $column FROM Contracts WHERE id = ?");
            $query->bindParam(1, $id);
            
            if($query->execute()){
                return parent::filterReading($query->fetch())[$column];
            }
        }
        else{
            $message = "$column NÃO É UMA COLUNA DA TABELA Contracts";
        }
        
        return new ExceptionModel($message ?? 'OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }
    
    public function readContract(string $id): array|ExceptionModel{
        // Obtém todos os dados do contrato com o id passado
        $query = parent::getConnection()->prepare('SELECT * FROM Contracts WHERE id = ?');
        $query->bindParam(1, $id);

        return $query->execute() ? parent::filterReading($query->fetch()) : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }

    public function update(string $column, string $value, string $id): int|ExceptionModel{
        // Atualiza dado da tabela selecionada
        if(ContractModel::isColumn($column)){
            $query = parent::getConnection()->prepare("UPDATE Contracts SET $column = ? WHERE id = ?");

            $query->bindParam(1, $value);
            $query->bindParam(2, $id);
            $query->execute();

            if(!$query->execute()){
                $message = "OPERAÇÃO FALHOU!";
            }
        }
        else{
            $message = "$column NÃO É UMA COLUNA DA TABELA Contracts";
        }
        
        return $query->rowCount() ?? new ExceptionModel($message, __FILE__, __FUNCTION__);
    }

    public function delete(string $id): int|ExceptionModel{
        // Deleta contrato do banco
        $query = parent::getConnection()->prepare('DELETE FROM Contracts WHERE id = ?');
        $query->bindParam(1, $id);
        return $query->execute() ? $query->rowCount() : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }
}

?>
