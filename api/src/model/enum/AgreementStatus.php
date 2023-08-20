<?php

namespace App\Model\Enumerate;

enum AgreementStatus{
    public const ACCEPTED = 'accepted';
    public const RECUSED = 'recused';
    public const SEND = 'send';
    public const CANCELED = 'canceled';
}

?>