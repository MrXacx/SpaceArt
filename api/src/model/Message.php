<?php

namespace App\Model;

use App\DAO\MessageDB;

class Message extends \App\Model\Template\Entity
{
    private string $sender;
    private string $chat;
    private string $content;
    private string $datetime;


    public static function getInstanceOf(array $attr): self
    {
        $entity = new Message();

        $entity->sender = $attr[MessageDB::CHAT];
        $entity->chat = $attr[MessageDB::DATETIME];
        $entity->content = $attr[MessageDB::CONTENT];
        $entity->datetime = $attr[MessageDB::CONTENT];

        return $entity;
    }

    public function toArray(): array
    {
        return [
            'sender' => $this->sender,
            'chat' => $this->chat,
            'content' => $this->content,
            'datetime' => $this->datetime,
        ];
    }

    public function getSender(): string
    {
        return $this->sender;
    }

    public function setChat(string $chat): void
    {
        $this->chat = $chat;
    }

    public function getChat(): string
    {
        return $this->chat;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setDatetime(string $datetime): void
    {
        $this->datetime = $datetime;
    }

    public function getDatetime(): string
    {
        return $this->datetime;
    }
}
