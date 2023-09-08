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

1. id: Token de acesso
2. type: tipo da conta
3. column: parâmetro a ser alterado
4. info: novo valor do parâmetro

- Situação:
> Funcionando


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

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando

## /user/report

### GET

- Parâmetros **obrigatórios**:

1. id: id da denúncia
2. reporter: id do denunciador

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. reporter: id do denunciador
2. reporte: id do denunciado
3. reason: motivo da denúncia

- Situação:
> Funcionando

## /user/report/list

### GET

- Parâmetros **obrigatórios**:

1. reporter: id do denunciador

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando

## /agreement

### GET

- Parâmetros **obrigatórios**:

1. id: ID do contrato

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. hirer: ID do contratante
2. hired: ID do contratado
3. art: tipo de arte
4. price: valor a ser pago
5. date: data do evento
6. time: horários de início e fim do evento separeados por ';'

- Situação:
> Funcionando

### UPDATE
- Parâmetros **obrigatórios**:

1. id: ID do contrato
2. column: parâmetro a ser alterado
3. info: novo valor do parâmetro

- Situação:
> Funcionando


### DELETE
- Parâmetros **obrigatórios**:

1. id: ID do contrato

- Situação:
> Funcionando


## /agreement/list

### GET

- Parâmetros **obrigatórios**:

1. user: ID do contratante ou do contratado

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando


## /agreement/rate

### GET

- Parâmetros **obrigatórios**:

1. agreement: ID do contrato
2. author: ID do autor da avaliação

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. agreement: ID do contrato
2. author: ID do autor da avaliação
3. rate: nota da avaliação
4. description: descrição da avaliação

- Situação:
> Funcionando

### UPDATE
- Parâmetros **obrigatórios**:

1. agreement: ID do contrato
2. author: ID do autor da avaliação
3. column: parâmetro a ser alterado
4. info: novo valor do parâmetro

- Situação:
> Funcionando


### DELETE
- Parâmetros **obrigatórios**:

1. agreement: ID do contrato
2. author: ID do autor da avaliação

- Situação:
> Funcionando


## /agreement/rate/list

### GET

- Parâmetros **obrigatórios**:

1. agreement: ID do contrato

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando


## /selection

### GET

- Parâmetros **obrigatórios**:

1. id: ID da seleção

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. owner: ID do criador da seleção
2. date: datas de abertura e fechamento da seleção. Devem estar separadas por ';'
3. time: horários de abertura e fechamento da seleção. Devem estar separados por ';'
4. price: valor a ser pago
5. art: tipo de arte do evento

- Situação:
> Funcionando

### UPDATE
- Parâmetros **obrigatórios**:

1. id: ID da seleção
2. column: parâmetro a ser alterado
3. info: novo valor do parâmetro

- Situação:
> Funcionando


### DELETE
- Parâmetros **obrigatórios**:

1. id: ID da seleção

- Situação:
> Funcionando


## /selection/list

### GET

- Parâmetros **obrigatórios**:

1. owner: ID do criador da seleção

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando


## /selection/application

### GET

- Parâmetros **obrigatórios**:

1. selection: ID da seleção
2. artist: ID do artista que se aplicou no processo

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. selection: ID da seleção
2. artist: ID do artista que se aplicou no processo

- Situação:
> Funcionando

### UPDATE
- Parâmetros **obrigatórios**:

1. selection: ID da seleção
2. artist: ID do artista que se aplicou no processo
3. column: parâmetro a ser alterado
4. info: novo valor do parâmetro

- Situação:
> Funcionando


### DELETE
- Parâmetros **obrigatórios**:

1. selection: ID da seleção
2. artist: ID do artista que se aplicou no processo

- Situação:
> Funcionando


## /selection/application/list

### GET

- Parâmetros **obrigatórios**:

1. owner: ID do criador da seleção

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando

## /chat

### GET

- Parâmetros **obrigatórios**:

1. id: ID do chat

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. artist: ID do artista
2. enterprise: ID do empreedimento

- Situação:
> Funcionando


## /chat/list

### GET

- Parâmetros **obrigatórios**:

1. user: ID do usuário

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando

## /chat/message

### GET

- Parâmetros **obrigatórios**:

1. chat: ID do chat
2. sender: ID do emissor
3. timestamp: Timestamp do envio

- Situação:
> Funcionando

### POST

- Parâmetros **obrigatórios**:

1. chat: ID do chat
2. sender: ID do emissor

- Situação:
> Funcionando


## /chat/list

### GET

- Parâmetros **obrigatórios**:

1. chat: ID do chat

- Parâmetros **opcionais**:

1. offset: linha de início de consulta. Padrão: 0, mínimo: 0.
2. limit: máximo de registros retornados. Padrão: 10, mínimo: 0, máximo: 500.

- Situação:
> Funcionando