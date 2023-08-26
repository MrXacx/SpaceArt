<?php

namespace App\Model;

use App\DAO\MessageDB;
use App\Util\DataFormmatException;
use DateTime;

/**
 * Classe de modelo de mensagens
 * @package Model
 * @author Ariel Santos (MrXacx)
 */
class Message extends \App\Model\Template\Entity
{
    /**
     * ID do emissor
     * @var string
     */
    private string $sender;

    /**
     * ID do chat
     * @var string
     */
    private string $chat;

    /**
     * Conteúdo  da mensagem
     * @var string
     */
    private string $content;

    /**
     * Momento do envio da mensagem
     * @var DateTime
     */
    private DateTime $datetime;

    /**
     * @param string ID do chat
     */
    function __construct(string $chat)
    {
        $this->chat = $this->validator->isUUID($chat) ? $chat : throw new DataFormmatException('chat id');
    }

    public static function getInstanceOf(array $attr): self
    {
        $entity = new Message($attr[MessageDB::CHAT]);

        $entity->sender = $attr[MessageDB::SENDER];
        $entity->content = $attr[MessageDB::CONTENT];
        $entity->datetime = DateTime::createFromFormat('Y-m-d H:i:s', $attr[MessageDB::DATETIME]);
        return $entity;
    }

    public function toArray(): array
    {
        return [
            'sender' => $this->sender,
            'chat' => $this->chat,
            'content' => $this->content,
            'datetime' => $this->datetime->format('d/m/Y H:is'),
        ];
    }

    /**
     * Define ID do emissor
     * @param string
     */
    public function setSender(string $sender)
    {
        $this->sender = $this->validator->isUUID($sender) ? $sender : throw new DataFormmatException('SENDER ID');
    }

    /**
     * Obtém ID do emissor
     * @return string
     */
    public function getSender(): string
    {
        return $this->sender;
    }

    /**
     * Obtém ID do chat
     * @param string
     */
    public function getChat(): string
    {
        return $this->chat;
    }

    /**
     * Define conteúdo da mensagem
     * @param string
     */
    public function setContent(string $content): void
    {
        $this->content = $this->validator->isFit($content) ? $content : throw new DataFormmatException('content', DataFormmatException::LENGTH);
    }

    /**
     * Obtém conteúdo da mensagem
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * Obtém marco temporal do envio da mensagem
     * @param string
     */
    public function getDatetime(): DateTime
    {
        return $this->datetime;
    }
}
