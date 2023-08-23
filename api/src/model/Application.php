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
    private string $user;

    /**
     * ID da seleção
     * @var string
     */
    private string $selection;

    /**
     * Última alteração na aplicação
     * @var string
     */
    private string $lastChange;

    /**
     * Insere ID da seleção
     * @param string
     */
    function setSelection(string $selection)
    {
        $this->selection =  $selection;
    }

    /**
     * Obtém ID da seleção
     * @return string
     */
    public function getSelection(): string
    {
        return $this->selection;
    }

    /**
     * Insere ID do usuário
     * @param string
     */
    public function setUser(string $user): void
    {
        $this->user = $user;
    }

    /**
     * Obtém ID do usuário
     * @return string
     */
    public function getUser(): string
    {
        return $this->user;
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Application();
        $entity->selection = $attr[ApplicationColumn::SELECTION];
        $entity->user = $attr[ApplicationColumn::ARTIST];
        $entity->lastChange = $attr[ApplicationColumn::LAST_CHANGE];

        return $entity;
    }

    public function toArray(): array
    {
        return [
            'selection' => $this->selection,
            'user' => $this->user,
            'last_change' => $this->lastChange ?? null,
        ];
    }
}
