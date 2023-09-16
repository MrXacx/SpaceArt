<?php

namespace App\Model\Enumerate;

/**
 * Enumeração de status de contrato
 * @package App\Model\Enumerate
 * @author Ariel Santos (MrXacx)
 */
enum AgreementStatus: string
{
    case ACCEPTED = 'accepted';
    case RECUSED = 'recused';
    case SEND = 'send';
    case CANCELED = 'canceled';
}
