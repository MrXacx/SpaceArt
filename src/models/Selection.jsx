import { WebServiceClient } from "../services/WebServiceClient";

const { request, error, status } = WebServiceClient;

export class Selection {
    id; art; price; owner;

    time = [];
    date = [];
    applications = [];
    url = 'service-spaceart.000webhostapp.com/selection';

    /**
     * Preenche todos os atributos
     * @param object 
     * @returns Selection
     */
    factory(selection){
        this.id = selection.id;
        this.art = selection.art;
        this.price = selection.owner;
        this.date = selection.date;
        this.time = selection.time;

        return this;
    }

    /**
     * Cria seleção
     */
    async create() {
        let response = await request.post(
            this.url,
            {
                id: this.id,
                art: this.art,
                price: this.price,
                date: this.date.join(';'),
                time: this.time.join(';')
            }
        );

        if (response.status !== status.CREATED) {
            error.HTTPRequestError.throw(`Não foi possível criar uma seleção`)
        }
    }

    /**
     * Buca lista de seleções com base num filtro
     * @param int offset 
     * @param int limit 
     * @param string filter 
     * @returns Selection[]
     */
    async fetchList(offset = 0, limit = 15, filter = 'owner') {
        let url = `${this.url}/list?offset=${offset}&limit=${limit}`;
        switch (filter) {
            case 'owner':
                url += '&owner='+this.owner;
                break;
            case 'art':
                url += '&art=' + this.art;
                break;
            default:
                throw new Error('O filtro selecionado não era esperado por este método.');
        }

        let response = await request.get(url);

        if (response.status !== status.OK){
            error.HTTPRequestError.throw(`Não foi possível buscar uma lista de seleções utilizando o filtro ${filter}`)
        }

        return response.data.map(selection => new Selection().factory(selection));
    }

    /**
     * Busca uma seleção
     * @returns Selection
     */
    async fetch() {
        let response = await request.get(`${this.url}?id=${this.id}`);

        if (response.status !== status.OK){
            error.HTTPRequestError.throw(`Não foi possível encontrar a seleção ${this.id}`)
        }

        let selection = response.data;

        return {
            id: selection.id,
            art: selection.art,
            price: selection.owner,
            date: selection.date.split(';'),
            time: selection.time.split(';'),
        }
    }
    
    /**
     * Deleta uma seleção
     */
    async delete() {
        let response = await request.post(
            `${this.url}/delete`, { id: this.id }
        );

        if (response.status !== status.NO_CONTENT){
            error.HTTPRequestError.throw(`Não foi possível deletar a seleção ${this.id}`)
        }
    }

    /**
     * Submete um artista à seleção
     * @param Artist artist 
     */
    async submitApplication(artist) {
        let response = await request.post(
            `${this.url}/application`,
            {
                artist: artist.id,
                selection: this.selection
            }
        );

        if (response.status !== status.OK){
            error.HTTPRequestError.throw(`Não foi possível submeter uma aplicação à seleção ${this.selection}`)
        }
    }

    /**
     * Busca uma lista de seleções
     * @param int offset 
     * @param int limit 
     * @returns object
     */
    async fetchApplications(offset = 0, limit = 15){
        let response = await request.get(
            `${this.url}/application/list?offset=${offset}&limit=${limit}&selection=${this.id}`
        );

        if (response.status !== status.OK){
            error.HTTPRequestError.throw(`Não foi encontrar aplicações para a seleção ${this.selection}`);
        }
        return response.data;
    }
}