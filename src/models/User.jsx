import { WebServiceClient } from "../services/WebServiceClient";

class User {
    id; index; token; type; email; password; phone; name; image;
    location = {};
    url = 'https://service-spaceart.000webhostapp.com/user';

    factory(user = {}) {
        this.id = user.id;
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
    }

    async signIn(acessData = {
        email: this.email,
        password: this.password
    }) {
        let response = await WebServiceClient.request.get(
            `${this.url}?email=${acessData.email}&password=${acessData.type}`
        );
    }

    async fetch(isToken = false) {
        let response = await WebServiceClient.request.get(
            `${this.url}?id=${this.id}&token=${isToken}&type=${this.type}`
        );

        return response.data;
    }

    async fetchList(offset = 0, limit = 25, filter = '', data = {}) {
        let url = `${this.url}/list?offset=${offset}&limit=${limit}&type=${this.type}`;

        if (filter === 'name') {
            url += `&name=${data.name}`;
        } else if (filter === 'location') {
            url += `&state=${data.state}&city=${data.city}`;
        }

        let response = await WebServiceClient.request.get(url);
    }

    updateList(token, attributes = []) {
        attributes.forEach(column => {
            this.update({
                id: token,
                type: this.type,
                column: column.name,
                info: column.value
            })

        });
    }

    async update(data = {}) {
        let response = await WebServiceClient.request.post(
            `${this.url}/update`, data
        );
    }


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

    factory(artist = {}) {

        super.factory(artist);
        this.wage = artist.wage;
        this.cpf = artist.cpf;
        this.art = artist.art;

        let enterprise = artist;
        this.cnpj = enterprise.cnpj;
        this.location.neighborhood = enterprise.neighborhood;
        this.location.adress = enterprise.adress;
    }

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
    }

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