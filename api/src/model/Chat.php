<?php

namespace App\Model;

use App\DAO\ChatDB;

class Chat extends \App\Model\Template\Entity
{
    private string $artist;
    private string $enterprise;

    function __construct(string $artist, string $enterprise)
    {
        $this->artist = $artist;
        $this->enterprise = $enterprise;
        parent::__construct();
    }

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

    public function getArtist(): string
    {
        return $this->id;
    }

    public function getEnterprise(): string
    {
        return $this->id;
    }

}
