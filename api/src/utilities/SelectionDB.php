<?php

declare(strict_types = 1);
namespace App\Utils;

require_once __DIR__.'/../../vendor/autoload.php';

use App\Utils\DatabaseAcess;
use App\Models\ExceptionModel;
use App\Models\SelectionModel;

class SelectionDB extends DatabaseAcess{

    public function create(object $selection): int|ExceptionModel{
        // Insere novo usuário no banco
        $selection->id = parent::getRandomID();
        $details = $selection->getDetails();

        $query = parent::getConnection()->prepare('INSERT INTO Selections (id, owner_id, price, inital_date, final_date, inital_time, final_time, art, selection_description) VALUES (?,?,?,?,?,?,?,?,?)');
        
        $details = $selection->getDetails();

        $query->bindParam(1, $selection->id);
        $query->bindParam(2, $selection->ownerID);
        $query->bindParam(3, $selection->price);
        $query->bindParam(4, $details['date']['inital']);
        $query->bindParam(5, $details['date']['final']);
        $query->bindParam(6, $details['time']['inital']);
        $query->bindParam(7, $details['time']['final']);
        $query->bindParam(8, $details['art']);
        $query->bindParam(9, $details['description']);

        return $query->execute() ? $query->rowCount() : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }

    public function read(string $column, string $id): string|ExceptionModel{
        if(SelectionModel::isColumn($column)){
            
            // Obtém todos os dado de uma coluna específica;
            $query = parent::getConnection()->prepare("SELECT $column FROM Selections WHERE id = ?");
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
    
    public function readSelection(string $id): SelectionModel|ExceptionModel{
        // Obtém todos os dados da seleção com o id passado
        $query = parent::getConnection()->prepare('SELECT * FROM Selections WHERE id = ?');
        $query->bindParam(1, $id);

        return $query->execute() ? SelectionModel::get(parent::filterReading($query->fetch())) : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }

    public function update(string $column, string $value, string $id): int|ExceptionModel{
        // Atualiza dado da tabela selecionada
        if(SelectionModel::isColumn($column)){
            $query = parent::getConnection()->prepare("UPDATE Selections SET $column = ? WHERE id = ?");

            $query->bindParam(1, $value);
            $query->bindParam(2, $id);
            $query->execute();

            if(!$query->execute()){
                $message = "OPERAÇÃO FALHOU!";
            }
        }
        else{
            $message = "$column NÃO É UMA COLUNA DA TABELA Selections";
        }
        
        return $query->rowCount() ?? new ExceptionModel($message, __FILE__, __FUNCTION__);
    }

    public function delete(string $id): int|ExceptionModel{
        // Deleta seleção do banco
        $query = parent::getConnection()->prepare('DELETE FROM Selections WHERE id = ?');
        $query->bindParam(1, $id);
        return $query->execute() ? $query->rowCount() : new ExceptionModel('OPERAÇÃO FALHOU!', __FILE__, __FUNCTION__);
    }
}

?>
