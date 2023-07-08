<?php
    namespace App\Utils;
    
    require_once __DIR__.'/../../vendor/autoload.php';

    use App\Settings\DatabaseAcess;
    use App\Models\ExceptionModel;
    use App\Models\UserModel;

    class UserDB extends DatabaseAcess{

        const NAME = 'full_name';
        const PWD = 'pwd';
        const DOCUMENT_NUMBER = 'document';
        const EMAIL = 'email_address, email_host';
        const CEP = 'cep';

        public function addUser(UserModel $user): void{
            // Insere novo usuário no banco
            $query = parent::getConnection()->prepare('INSERT INTO users (full_name, email, pwd, doc_number, cep) VALUES (?,?,?,?,?)');
            
            $query->bindParam(1, $user->getName());
            $query->bindParam(2, $user->getEmail());
            $query->bindParam(3, $user->getPwd());
            $query->bindParam(4, $user->getDocumentNumber());
            $query->bindParam(5, $user->getCEP());

            $query->execute();
            if($query->rowCount() == 0){
               new ExceptionModel('OPERAÇÃO FALHOU!', __DIR__.__FILE__, __FUNCTION__);
            }
        }

        public function get(string $column, string $id): array|string{
            // Obtém todos os dado de uma coluna específica;
            $query = parent::getConnection()->prepare('SELECT :col FROM users WHERE id = ?');
            $query->bindValue(':col', $column);
            $query->bindParam(1, $id);
            $query->execute();

            $result = $query->fetch();

            if(count($result) == 0){
                new ExceptionModel('OPERAÇÃO FALHOU!', __DIR__.__FILE__, __FUNCTION__);
            }

            return $result;
        }

        public function getID(string $email): string{
            // Obtém ID do usuário com o email inserido
            $query = parent::getConnection()->prepare('SELECT id FROM users WHERE email = ?');
            $query->bindParam(1, $email);
            $query->execute();
            $result = $query->fetch();
            
            if(count($result) == 0){
               new ExceptionModel('OPERAÇÃO FALHOU!', __DIR__.__FILE__, __FUNCTION__);
            }
            return $result;
        }
        
        public function getUser(string $id): array{
            // Obtém todos os dados do usuário com o id passado
            $query = parent::getConnection()->prepare('SELECT * FROM users WHERE id = ?');
            $query->bindParam(1, $id);
            $query->execute();
            $result = $query->fetch();

            if(count($result) == 0){
               new ExceptionModel('OPERAÇÃO FALHOU!', __DIR__.__FILE__, __FUNCTION__);
            }

            return $result;
        }

        public function update(string $column, string $value, string $id): void{
            $query = parent::getConnection()->prepare('UPDATE SET :col = ? WHERE id = ?');
            $query->bindValue(':col', $column);
            $query->bindParam(1, $value);
            $query->bindParam(2, $id);
            $query->execute();

            if($query->rowCount() == 0){
                new ExceptionModel('OPERAÇÃO FALHOU!', __DIR__.__FILE__, __FUNCTION__);
            }
        }

        public function updateEmail(string $address, string $host, string $id): void{
            $this->update('email_address', $address, $id);
            $this->update('email_host', $host, $id);
        }

        public function deleteUser(string $id): void{
            // Deleta usuário do banco
            $query = parent::getConnection()->prepare('DELETE FROM users WHERE id = ?');
            
            $query->bindParam(1, $id);
            $query->execute();

            if($query->rowCount() == 0){
               new ExceptionModel('OPERAÇÃO FALHOU!', __DIR__.__FILE__, __FUNCTION__);
            }
        }

    }    
?>