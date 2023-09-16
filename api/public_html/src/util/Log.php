<?php

namespace App\Util;
use Monolog\Formatter\JsonFormatter;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Level;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class Log{
    private const path = __DIR__. './../../../tmp/log/';
    private string $currentFile = '';
    public function __construct(private Logger $logger, private Level $level) {
        new JsonFormatter();
    }
    public function build(): void{
        $file =  self::path . 'SpacearAPI.log';
        if($this->currentFile != $file){
            $this->logger->pushHandler(new RotatingFileHandler($file, 366, $this->level));
        }
    }

    public function push(string $message, Level $level){
        $levelMethod = match($level){
            Level::Critical => 'critical',
            Level::Emergency => 'emergency',
            Level::Error => 'error',
            Level::Alert => 'alert',
            Level::Warning => 'warning',
            Level::Notice => 'notice',
            Level::Info => 'info',
            Level::Debug => 'debug'
        };

    
        
        $this->logger->$levelMethod($message);
    }
}

?>