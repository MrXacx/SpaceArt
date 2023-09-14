<?php

namespace App\Model;

use App\DAO\ChatDB;
use App\Util\DataFormatException;

/**
 * Classe modelo de chat
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class Chat extends \App\Model\Template\Entity
{
    /**
     * ID do artista
     * @var string
     */
    private string $artist;

    /**
     * ID do empreedimento
     * @var string
     */
    private string $enterprise;


    public static function getInstanceOf(array $attr): self
    {
        $entity = new Chat;
        $entity->id = $attr['id'];
        $entity->artist = $attr[ChatDB::ARTIST];
        $entity->enterprise = $attr[ChatDB::ENTERPRISE];

        return $entity;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'artist' => $this->artist,
            'enterprise' => $this->enterprise
        ]);
    }

    /**
     * Define ID do artista
     * @param string
     */
    public function setArtist(string $artist): void
    {
        $this->artist = $this->validator->isUUID($artist) ? $artist : DataFormatException::throw('artist id');
    }

    /**
     * Define ID do empreedimento
     * @param string
     */
    public function setEnterprise(string $enterprise): void
    {
        $this->enterprise = $this->validator->isUUID($enterprise) ? $enterprise : DataFormatException::throw('enterprise id');
    }

    /**
     * Obtém ID do artista
     * @return string
     */
    public function getArtist(): string
    {
        return $this->artist;
    }

    /**
     * Obtém ID do empreedimento
     * @return string
     */
    public function getEnterprise(): string
    {
        return $this->enterprise;
    }
}