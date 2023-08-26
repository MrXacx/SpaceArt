<?php

namespace App\Model;

use App\DAO\ChatDB;
use App\Util\DataFormmatException;

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
        $entity = new Chat($attr[ChatDB::ARTIST], $attr[ChatDB::ENTERPRISE]);
        $entity->id = $attr['id'];
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
        $this->artist = $this->validator->isUUID($artist) ? $artist : throw new DataFormmatException('artist id');
    }

    /**
     * Define ID do empreedimento
     * @param string
     */
    public function setEnterprise(string $enterprise): void
    {
        $this->artist = $this->validator->isUUID($enterprise) ? $enterprise : throw new DataFormmatException('enterprise id');
    }

    public function getArtist(): string
    {
        return $this->artist;
    }

    public function getEnterprise(): string
    {
        return $this->enterprise;
    }
}
