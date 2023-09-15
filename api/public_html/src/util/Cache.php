<?php

namespace App\Util;
class Cache{
    public const TINY_INTERVAL_STORAGE = 3;
    public const MEDIUM_INTERVAL_STORAGE = 5;
    public const LARGE_INTERVAL_STORAGE = 7;
    readonly public string $path;
    public function __construct(string $fileName) {
        $this->path = __DIR__."/../../cache/$fileName.txt";
    }

    public function create(string|array $content, int $expireTimeInMinutes): bool{

        if(
             !file_exists($this->path) || $this->isExpired($expireTimeInMinutes)
        ){
            return false !== file_put_contents($this->path, json_encode([
                'expiration' => $expireTimeInMinutes,
                'data' => $content,
            ]));
        }

        return false;
    }

    private function isExpired(int $expireTimeInMinutes): bool{
        return strtotime( "+ $expireTimeInMinutes Minutes", filectime($this->path)) <= strtotime('now');
    }

    public function isNotUsable(): bool{

        return !file_exists($this->path) || strtotime(
            json_decode(file_get_contents($this->path))->expiration
        ) <= strtotime('now');
    }

    public function getContent(): string{
        return json_decode(file_get_contents($this->path))->data;
    }
}