<?php

declare(strict_types = 1);
namespace App\Models;

use App\DAO\SelectionDB;
use App\Utils\DataValidator;

/**
 * Classe modelo de seleção
 * @package Models
 * @author Ariel Santos (MrXacx)
 */
class SelectionModel{

    // TODO: adicionar coluna de status(enum, se possível), avaliação(int) e lista de submissões

    /**
     * ID da seleção
     * @var string
     */
    private string $id;
    
    /**
     * Valor da seleção
     * @var string
     */
    private string $price;
    
    /**
     * Detalhes da seleção
     * @var array
     */
    private array $details;
    
    /**
     * ID do criador da seleção
     * @var string
     */
    public string $ownerID;

    private DataValidator $validator;

    /**
     * @param string $ownerID ID do criador da seleção
     */
    function __construct(string $ownerID){
        $this->validator = new DataValidator();
        $this->ownerID = $this->validator->validateVarcharLength($ownerID, 'id') ? $ownerID : null;;         
    }

    /**
     * Obtém um modelo de seleção inicializado
     * 
     * @param array $attr Array associativo contento todas as informações do modelo
     * @return self Instância da classe
     */
    public static function getInstaceOf(array $attr): self{
        $datetime = [explode(' ', $attr[SelectionDB::INITAL_DATETIME]), explode(' ', $attr[SelectionDB::FINAL_DATETIME])];

        $model = new SelectionModel($attr[SelectionDB::OWNER_ID]);
        $model->id = $attr['id'];
        $model->price = $attr[SelectionDB::PRICE];
        $model->details = [
            'art' => $attr[SelectionDB::ART],
            'date' => [
                'inital' => $datetime[0][0],
                'final' => $datetime[1][0]
            ],
            'time' => [
                'inital' => $datetime[0][1],
                'final' => $datetime[1][1]
            ]
        ];

        return $model;
    }

    public function setID(string $id){
        $this->id = $this->validator->validateVarcharLength($id, 'id') ? $id : null;
    }

    public function setPrice(string $price){
        $this->price = $this->validator->validatePrice($price) ? $price : 'null';
    }

    public function setArt(string $art){
        $this->details['art'] = $this->validator->validateVarcharLength($art, SelectionDB::ART) ? $art : null;
    }

    public function setDate(string $inital, string $final){
        $this->details['date']['inital'] = $this->validator->buildDate($inital);
        $this->details['date']['final'] = $this->validator->buildDate($final);
    }

    public function setTime(string $inital, string $final){
        $this->details['time']['inital'] = $this->validator->buildTime($inital);
        $this->details['time']['final'] = $this->validator->buildTime($final);
    }

    public function getID(): string{
        return $this->id;
    }

    public function getOwnerID(): string{
        return $this->ownerID;
    }
 
    public function getPrice(): string{
        return $this->price;
    }

    public function getDatetime(): array{

        return [
            'inital' => $this->details['date']['inital']." ".$this->details['time']['inital'],
            'final' => $this->details['date']['final']." ".$this->details['time']['final']
            ];
    }
 
    /**
     * Obtém tipo de arte
     * 
     * @return string Arte a ser praticada
     */
    public function getArt(): string{
        return $this->details['art'];
    }
    
    
}

?>