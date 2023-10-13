import { WebServiceClient } from "../services/WebServiceClient";

export class Selection {
    id; art; price; owner;

    time = {};
    date = {};
    url = 'service-spaceart.000webhostapp.com/selection';
    async create() {
        let response = await WebServiceClient.request.post(
            this.url,
            {
                id: this.id,
                art: this.art,
                price: this.price,
                date: Object.entries(this.date).join(';'),
                time: Object.entries(this.time).join(';')
            }
        );
    }

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

        let response = await WebServiceClient.request.get(url);

        return response.status;
    }


    async fetch() {
        let response = await WebServiceClient.request.get(`${this.url}?id=${this.id}`);
    }

    async delete() {
        let response = await WebServiceClient.request.get(
            `${this.url}/delete`, { id: this.id }
        );
    }

    async submitApplication(artist) {
        let response = await WebServiceClient.request.post(
            `${this.url}/application`,
            {
                artist,
                selection: this.selection
            }
        );
    }

    async fetchApplications(offset = 0, limit = 15){
        let response = await WebServiceClient.request.get(
            `${this.url}/application/list?offset=${offset}&limit=${limit}&selection=${this.id}`
        );
    }
}