import { WebServiceClient } from '../services/WebServiceClient';
const { request, error, status } = WebServiceClient;

class Agreement{
    id; hirer; hired; art; price;
    date = {};
    time = {};
    url = 'https://service-spaceart.000webhostapp.com/agreement';
    factory(agreement){
        this.id = agreement.id;
        this.hirer = agreement.hirer;
        this.hired = agreement.hired;
        this.art = agreement.art;
        this.price = agreement.price;
        this.date = agreement.date;
        this.time = agreement.time;

        return this;
    }

    async create(){
        let response = await request.post(
            this.url, {
                hirer: this.hirer,
                hired: this.hired,
                art: this.art,
                price: this.price,
                date: Object.entries(this.date).join(';'),
                time: Object.entries(this.time).join(';')
            }
        );

        if(response.status !== status.OK){
            error.HTTPRequestError.throw("Não foi possível criar um contrato");
        }
    }

    async fetch(){
        let response = await request.get(`${this.url}?id=${this.id}`);

        if(response.status !== status.OK){
            error.HTTPRequestError.throw(`Não foi possível encontrar o contrato ${this.id}`);
        }

        let agreement = response.data;

        return {
            id: agreement.id,
            hirer: agreement.hirer,
            hired: agreement.hired,
            art: agreement.art,
            price: agreement.price,
            date: agreement.date.split(';'),
            price: agreement.price.split(';')
        }
    }

    async fetchList(user, offset = 0, limit = 10){
        let response = await request.get(`${this.url}/list?user=${user}`);

        if(response.status !== status.OK){
            error.HTTPRequestError.throw(`Não foi possível contratos do usuário ${user}`);
        }
    }

    async delete(){
        let response = await request.post(`${this.url}/delete`, {id: this.id});

        if(response.status !== status.NO_CONTENT){
            error.HTTPRequestError.throw(`Não foi possível deleter o contrato ${this.id}`);
        }
    }
    
}


class AgreementPut{

    constructor (Agreement){
        this.id = Agreement.id;
        this.column = Agreement.column;
        this.info = Agreement.info;
    }

}
class AgreementDelete{

    constructor (Agreement){
        this.id = Agreement.id;
    }

}
class AgreementListGet{

    constructor (Agreement){
        this.id = Agreement.id;
        this.offset = Agreement.offset;
        this.limit = Agreement.limit;
    }

}
class AgreementRateGet{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
       
    }

}
class AgreementRatePost{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
        this.rate = Rate.value;
    }

}
class AgreementRatePut{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
        this.column = Rate.column;
        this.info= Rate.info;
    }

}
class AgreementRateDelete{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
    }

}
class AgreementRateListGet{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.offset = Rate.offset;
        this.limit = Rate.limit;
    }

}