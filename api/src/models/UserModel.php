<?php
    namespace App\Models;
    
    class UserModel{
        private string $id;
        private string $name;
        private string $email;
        private string $pwd;
        private string $documentNumber;
        private string $cep;
        
        function __construct(string $name, string $email, string $pwd, string $documentNumber, string $cep){
            $this->name = $name;
            $this->email = $email;
            $this->pwd = $pwd;
            $this->documentNumber = $documentNumber;
            $this->cep = $cep;
        }

        public function setID(string $id): void{
            $this->id = $id;
        }

        public function getID(): string{
            return $this->id;
        }

        public function getName(): string{
            return $this->name;
        }

        public function getEmail(): string{
            return $this->email;
        }

        public function getPwd(): string{
            return $this->pwd;
        }

        public function getDocumentNumber(): string{
            return $this->documentNumber;
        }

        public function getCEP(): string{
            return $this->cep;
        }
    }
?>