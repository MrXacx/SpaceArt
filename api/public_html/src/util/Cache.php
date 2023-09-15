<?php

namespace App\Util;
class Cache{
    public const TINY_INTERVAL_STORAGE = 3;
    public const MEDIUM_INTERVAL_STORAGE = 5;
    public const LARGE_INTERVAL_STORAGE = 7;

    readonly public string $path;
    public function __construct(string $fileName) {
        $this->path = __DIR__."/../../../tmp/cache/$fileName.cache";
    }

    public function create(string|array $content, int $expireTimeInMinutes): bool{
        $content = json_encode([
            'expiration' => strtotime("+ $expireTimeInMinutes minutes", time()),
            'data' => $content,
        ], JSON_INVALID_UTF8_SUBSTITUTE);

        return false !== file_put_contents($this->path, $content);

    }

    public function isUsable(): bool{
        if(file_exists($this->path)){
            $expirationTime = json_decode(file_get_contents($this->path))->expiration;
            return  $expirationTime > time();
        }
        return false;
    }

    public function getContent(): string{
        return json_encode(json_decode(file_get_contents($this->path))->data);
    }
}