<?php
    namespace App\Settings;

    require_once __DIR__.'/enviroment.php';
    require_once __DIR__.'/../../vendor/autoload.php';

    use PDO;
    use PDOException;
    use App\Models\ExceptionModel;   

    abstract class DatabaseAcess{
        private PDO $connection;

        function __construct(){
            try{
                $this->connection = new PDO($_ENV['db_host'], $_ENV['db_user'], $_ENV['db_pwd']);
            } catch(PDOException $e){
                new ExceptionModel($e->getMessage(), __DIR__.__FILE__, __FUNCTION__);
            }
        }

        protected function getConnection(): PDO{
            return $this->connection;
        }

        function __destruct(){
            unset($this->connection);
        }
    }
?>