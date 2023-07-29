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
     * ID do criador da seleção
     * @var string
     */
    public string $ownerID;

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
     * Objeto de validação
     * @var DataValidator
     */
    private DataValidator $validator;

    /**
     * @param string $ownerID ID do criador da seleção
     */
    function __construct(string $ownerID){
        $this->validator = new DataValidator();
        $this->ownerID = $this->validator->isValidVarcharLength($ownerID, 'id') ? $ownerID : null;;         
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

    /**
     * Define id da seleção
     * 
     * @param string $id ID
     */
    public function setID(string $id){
        $this->id = $this->validator->isValidVarcharLength($id, 'id') ? $id : null;
    }

    /**
     * Obtém ID do modelo
     * 
     * @return string ID
     */
    public function getID(): string{
        return $this->id;
    }

    /**
     * Obtém ID do criador da selção
     *  
     * @return string ID
     */
    public function getOwnerID(): string{
        return $this->ownerID;
    }

    /**
     * Define Valor da seleção
     * 
     * @param string $price Valor da seleção
     */
    public function setPrice(string $price){
        $this->price = $this->validator->isPrice($price) ? $price : 'null';
    }

    /**
     * Obtém Valor da seleção
     * 
     * @return string Preço
     */
    public function getPrice(): string{
        return $this->price;
    }

    /**
     * Define datas de início e fim da seleção
     * 
     * @param string $inital Data de início
     * @param string $inital Data de fim
     */
    public function setDate(string $inital, string $final){
        $this->details['date'] =  array_combine(['inital', 'final'], $this->validator->isValidDateFormat($inital) && $this->validator->isValidDateFormat($final) ? [$inital, $final] : [null, null]);
    }

    /**
     * Define Horários de início e fim da seleção
     * 
     * @param string $inital Horário de início
     * @param string $inital Horário de fim
     */
    public function setTime(string $inital, string $final){
        $this->details['time']['inital'] = $this->validator->buildTime($inital);
        $this->details['time']['final'] = $this->validator->buildTime($final);
    }
    
    /**
     * Obtém Datas e horários de início e fim do modelo
     * 
     * @return array Vetor de datetimes
     */
    public function getDatetime(): array{
        return [
            'inital' => $this->details['date']['inital']." ".$this->details['time']['inital'],
            'final' => $this->details['date']['final']." ".$this->details['time']['final']
            ];
    }

    /**
     * Define tipo de arte da seleção
     * 
     * @param string $art tipo de arte
     */
    public function setArt(string $art){
        $this->details['art'] = $this->validator->isValidVarcharLength($art, SelectionDB::ART) ? $art : null;
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