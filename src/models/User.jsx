import { WebServiceClient } from "../services/WebServiceClient";

const HTTPRequestError = WebServiceClient.error.HTTPRequestError;
const api = WebServiceClient.request;
const status = WebServiceClient.status;

/**
 * Classe de consulta de dados de usuários
 */
class User {
    id; index; token; type; email; password; phone; name; image; // Todos os atributos úteis retornados
    location = {}; // Objeto para dados de localização

    url = 'https://service-spaceart.000webhostapp.com/user'; // URL base para consulta

    /**
     * Preenche todos os atributos da classe
     * @param object Atributos da classe em objeto literal
     * @returns User 
     */
    factory(user) {
        this.id = user.id;
        this.index = user.index;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.phone = user.phone;
        this.location = {
            cep: user.cep,
            state: user.state,
            city: user.city
        }

        this.image = user.image;
        return this;
    }

    /**
     * Consulta dados de identificação
     * @param string email
     * @param string password
     * @returns object
     */
    async signIn(
        email = this.email,
        password = this.password
    ) {
        let response = await api.get(
            `${this.url}?email=${email}&password=${password}`
        );

        if (response.status !== status.OK) { // Executa caso o código da resposta não seja OK
            HTTPRequestError.throw(response.statusText); // Emite exceção
        }

        response = response.data;

        return {
            id: response.id,
            token: response.token,
            index: response.index,
            type: response.type
        }
    }

    /**
     * Consulta dados gerais
     * @param boolean true para obter dados sigilosos
     * @returns object 
     */
    async fetch(isToken = false) {
        let response = await api.get(
            `${this.url}?id=${this.id}&token=${isToken}&type=${this.type}`
        );

        if (response.status !== status.OK) {
            HTTPRequestError.throw(response.statusText);
        }

        return response.data;
    }

    /**
     * Busca lista de usuários
     * @param int posição de início da consulta
     * @param int limite de itens retornados
     * @param string filtro de busca
     * @param object dados associados ao filtro (nome, localização e etc)
     * @returns object[]
     */
    async fetchList(offset = 0, limit = 25, filter = null, data = {}) {
        let url = `${this.url}/list?offset=${offset}&limit=${limit}&type=${this.type}`;

        if (filter === 'name') {
            url += `&name=${data.name}`;
        } else if (filter === 'location') {
            url += `&state=${data.state}&city=${data.city}`;
        }

        let response = await api.get(url);

        if (response.status !== status.OK) {
            HTTPRequestError.throw(response.statusText);
        }

        return response.data;
    }

    /**
     * Atualiza lista de atributos
     * @param string token
     * @param object[] lista de atributos a serem atualizados
     * @returns string[] lista de exceções obtidas
     */
    updateList(token, attributes = [{ name: null, value: null }]) {
        let errors = []
        attributes.forEach(column => { // itera colunas a serem atualizadas
            try {
                this.update({ // atualiza dados da api
                    id: token,
                    type: this.type,
                    column: column.name,
                    info: column.value
                });

                this[column.name] = column.value; // Atualiza dados localmente
            } catch (error) {
                errors
                    .push( // Guarda exceção para ser retornada
                        `Não foi possível atualizar o item ${column.name} com o valor ${column.value}`
                    );
            }

        });

        return errors;
    }

    /**
     * Atualiza um atributo específico
     * @param object body da requisição
     */
    async update(data) {
        let response = await api.post(
            `${this.url}/update`, data
        );

        if (response.status !== status.NO_CONTENT) {
            HTTPRequestError.throw(response.statusText);
        }
    }

    /**
     * Deleta usuário
     * @param string token
     */
    async delete(token) {
        let response = await api.get(
            `${this.url}/delete`, { id: token }
        );

        if (response.status !== status.NO_CONTENT) {
            HTTPRequestError.throw(response.statusText);
        }
    }

}

export class Artist extends User {
    cpf; art; wage; birthday;

    constructor() {
        super();
        this.type = 'artist';
    }

    factory(artist) {

        super.factory(artist);
        this.wage = artist.wage;
        this.cpf = artist.cpf;
        this.art = artist.art;

        let enterprise = artist;
        this.cnpj = enterprise.cnpj;
        this.location.neighborhood = enterprise.neighborhood;
        this.location.adress = enterprise.adress;

        return this;
    }

    /**
     * Cadastra um usuário
     */
    async signUp() {
        let response = await api.post(
            this.url,
            {
                name: this.name,
                image: this.image,
                type: this.type,
                phone: this.phone,
                email: this.email,
                password: this.password,
                birthday: this.birthday,
                cpf: this.cpf,
                cep: this.location.cep,
                state: this.location.state,
                city: this.location.city,
                art: this.art,
                wage: this.wage
            });

        if (response.status !== status.CREATED) {
            HTTPRequestError.throw((await response).statusText);
        }
    }


    fetch(token = false) {
        return new Artist().factory(super.fetch(token)); // Intancia o retorno
    }

    fetchList(offset = 0, limit = 25, filter = null, data = {}) {

        return super
            .fetchList(offset, limit, filter, data)
            .map(new Artist().factory); // Instancia todos os registor retornados
    }
}

export class Enterprise extends User {
    cnpj; companyName;

    constructor() {
        super();
        this.type = 'enterprise';
    }

    factory(enterprise = {}) {
        super.factory(enterprise);
        this.cnpj = enterprise.cnpj;
        this.companyName = enterprise.companyName;
        this.location.neighborhood = enterprise.neighborhood;
        this.location.adress = enterprise.adress;

        return this;
    }

    /**
     * Cadastra um usuário
     */
    async signUp() {
        let response = await api.post(
            this.url,
            {
                name: this.name,
                companyName: this.companyName,
                image: this.image,
                phone: this.phone,
                type: this.type,
                email: this.email,
                password: this.password,
                birthday: this.birthday,
                cnpj: this.cnpj,
                cep: this.location.cep,
                state: this.location.state,
                city: this.location.city,
                neighborhood: this.location.neighborhood,
                address: this.location.address
            });

        if (response.status !== status.CREATED) {
            HTTPRequestError.throw((await response).statusText);
        }
    }

    fetch(token = false) {
        return new Artist().factory(super.fetch(token)); // Intancia o retorno
    }

    fetchList(offset = 0, limit = 25, filter = null, data = {}) {

        return super
            .fetchList(offset, limit, filter, data)
            .map(new Artist().factory); // Instancia todos os registor retornados
    }
}