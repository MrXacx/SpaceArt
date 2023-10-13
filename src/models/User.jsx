import { WebServiceClient } from "../services/WebServiceClient";


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
        let response = await WebServiceClient.request.get(
            `${this.url}?email=${email}&password=${password}`
        );
    }

    /**
     * Consulta dados gerais
     * @param boolean true para obter dados sigilosos
     * @returns object 
     */
    async fetch(isToken = false) {
        let response = await WebServiceClient.request.get(
            `${this.url}?id=${this.id}&token=${isToken}&type=${this.type}`
        );

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

        let response = await WebServiceClient.request.get(url);
    }

    /**
     * Atualiza lista de atributos
     * @param string token
     * @param object[] lista de atributos a serem atualizados
     */
    updateList(token, attributes = [{ name: null, value:null}]) {
        attributes.forEach(column => {
            this.update({
                id: token,
                type: this.type,
                column: column.name,
                info: column.value
            });

            
        });
    }

    /**
     * Atualiza um atributo específico
     * @param object body da requisição
     * @returns boolean
     */
    async update(data) {
        let response = await WebServiceClient.request.post(
            `${this.url}/update`, data
        );
    }

    /**
     * Deleta usuário
     * @param string token
     * @returns boolean
     */
    async delete(token) {
        let response = await WebServiceClient.request.get(
            `${this.url}/delete`, { id: token }
        );
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
        let response = WebServiceClient.request.post(
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
    }

    
    async fetch(token = false) {
        let response = super.fetch(token);
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
        let response = WebServiceClient.request.post(
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
    }

    fetch(token = false) {
        let response = super.fetch(token);
    }
}