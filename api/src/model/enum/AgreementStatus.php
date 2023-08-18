<?php

namespace App\Model\Enumerate;

enum AgreementStatus{
    case ACCEPTED;
    case RECUSED;
    case SEND;
    case CANCELED;
}
