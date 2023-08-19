<?php

namespace App\Model;

use App\DAO\Enumerate\ApplicationColumn;

/**
 * Classe modelo de aplicação a uma seleção
 * 
 * @author Ariel Santos (MrXacx)
 */

class Application extends \App\Model\Template\Entity
{
    /**
     * ID do usuário
     * @var string
     */
    private string $userID;

    /**
     * ID da seleção
     * @var string
     */
    private string $selectionID;

    /**
     * Última alteração na aplicação
     * @var string
     */
    private string $lastChange;

    /**
     * Insere ID da seleção
     * @param string
     */
    function setSelectionID(string $selectionID)
    {
        $this->selectionID =  $selectionID;
    }

    /**
     * Obtém ID da seleção
     * @return string
     */
    public function getSelectionID(): string
    {
        return $this->selectionID;
    }

    /**
     * Insere ID do usuário
     * @param string
     */
    public function setUserID(string $userID): void
    {
        $this->userID = $userID;
    }

    /**
     * Obtém ID do usuário
     * @return string
     */
    public function getUserID(): string
    {
        return $this->userID;
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Application();
        $entity->selectionID = $attr[ApplicationColumn::SELECTION];
        $entity->userID = $attr[ApplicationColumn::ARTIST];
        $entity->lastChange = $attr[ApplicationColumn::LAST_CHANGE];

        return $entity;
    }

    public function toArray(): array
    {
        return [
            'selection' => $this->selectionID,
            'user' => $this->userID,
            'last_change' => $this->lastChange ?? null,
        ];
    }
}
