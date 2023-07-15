<?php

    declare(strict_types = 1);    
    namespace App\Utils;

    require_once __DIR__.'/../../vendor/autoload.php';

    use PDO;
    use PDOException;
    use App\Models\ExceptionModel;   
    use Ramsey\Uuid\Uuid;


    abstract class DatabaseAcess{
        private PDO $connection;

        function __construct(){
            try{
                $this->connection = new PDO($_ENV['db_host'], $_ENV['db_user'], $_ENV['db_pwd']);
            } catch(PDOException $e){
                new ExceptionModel($e->getMessage(), __FILE__, __FUNCTION__);
            }
        }

        protected function getConnection(): PDO{
            return $this->connection;
        }

        protected function getRandomID():string{
            return Uuid::uuid7()->toString();
        }

        protected function filterReading(array $readingResult = ['fail' => null]): array{
            return array_filter(
                $readingResult,
                fn($key) => is_string($key),
                ARRAY_FILTER_USE_KEY
            );
        }

        function __destruct(){
            unset($this->connection);
        }

        abstract public function create(object $user): int|ExceptionModel;
        abstract public function read(string $column, string $id): string|ExceptionModel;
        abstract public function update(string $column, string $value, string $id): int|ExceptionModel;
        abstract public function delete(string $id): int|ExceptionModel;
    }
?>
