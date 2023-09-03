# Controle de testes de rotas

> http://localhost:<port>/<path>?<parameters>

## /user

### GET

- Parâmetros **obrigatórios**:

1. id: ID do usuário
2. type: tipo de conta do usuário

- Parâmetros **opcionais**:

1. token: true caso o ID seja um token de acesso. Padrão: false.

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. name: nome do usuário
2. type: tipo de conta
3. email: email do usuário
4. password: senha do usuário
5. phone: número de celular do usuário
6. federation: unidade federativa do usuário
7. city: município do usuário
8. cep: CEP do usuário
9. image: URL da foto de perfil do usuário

- Outros parâmetos **obrigatórios** caso type = artist

1. wage: pretensão salarial
2. cpf: CPF do usuário
3. art: tipo de arte do usuário

- Outros parâmetos **obrigatórios** caso type = enterprise

1. cnpj: CNPJ do usuário
2. district: região do município em que o estabelecimento se localiza
2. address: conjunto restante do endereço (logradouro, número, complemento, ponto de referência e etc)


- Situação:
> Caso type = artist
>> Funcionando
>
> Caso type = enterprise
>> Funcionando

### UPDATE
- Parâmetros **obrigatórios**:

1. id: ID do usuário
2. type: tipo da conta
3. column: parâmetro a ser alterado
4. info: novo valor do parâmetro

- Situação:
> Falta testar


### DELETE
- Parâmetros **obrigatórios**:

1. id: ID do usuário

- Situação:
> Funcionando


## /user/sign-in

### GET

- Parâmetros **obrigatórios**:

1. email: email do usuário
2. password: senha do usuário

- Situação:
> Funcionando


## /user/list

### GET

- Parâmetros **obrigatórios**:

1. type: tipo de conta buscado
2. offset: linha de início de consulta
3. offset: máximo de registros retornados

- Situação:
> Falta testar