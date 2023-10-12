import { WebServiceClient } from "../services/WebServiceClient";

export class Report {
    id; reporter; reported; reason;
    url = 'https://service-spaceart.000webhostapp.com/user/report';

    constructor(reporter) {
        this.reporter = reporter;
    }

    factory(report) {
        this.id = report.id;
        this.reported = report.reported;
        this.reason = report.reason;
    }

    async create() {
        let response = WebServiceClient.request.post(
            this.url,
            {
                reporter: this.reporter,
                reported: this.reported,
                reason: this.reason
            });
    }

    async getList(offset = 0, limit = 10) {
        let response = WebServiceClient.request.get(
            `${this.url}?offset=${offset}&limit=${limit}&reporter=${this.reporter}`
        );
    }

}