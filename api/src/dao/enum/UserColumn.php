<?php

namespace App\DAO\Enumerate;

enum UserColumn: string
{
    /**
     * Nome da coluna de nome
     * @var string
     */
    public const NAME = 'name';

    /**
     * Nome da coluna de senha 
     * @var string
     */
    public const PASSWORD = 'password';

    /**
     * Nome da coluna de telefone 
     * @var string
     */
    public const PHONE = 'phone';

    /**
     * Nome da coluna de email
     * @var string
     */
    public const EMAIL = 'email';

    /**
     * Nome da coluna de cep
     * @var string
     */
    public const CEP = 'CEP';

    /**
     * Nome da coluna de site
     * @var string
     */
    public const SITE = 'website';

    /**
     * Nome da coluna de CPF
     * @var string
     */
    public const CPF = 'CPF';

    /**
     * Nome da coluna de CNPJ
     * @var string
     */
    public const CNPJ = 'CNPJ';

    /**
     * Nome da coluna de tipo de conta
     * @var string
     */
    public const TYPE = 'type';


    /**
     * Confere se valor é idêntico ao nome de alguma coluna da tabela
     * 
     * @param string Nome da coluna
     * @return bool Retorna true se coluna for compatível
     */
    public static function isColumn(string $column): bool
    {
        return !is_bool(array_search($column, self::cases()));
    }
}
