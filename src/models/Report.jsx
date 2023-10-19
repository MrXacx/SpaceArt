import { WebServiceClient } from "../services/WebServiceClient";

const api = WebServiceClient.request;
const HTTPRequestError = WebServiceClient.error.HTTPRequestError;
const status = WebServiceClient.status;

export class Report {
  id;
  reporter;
  reported;
  reason;
  url = "https://service-spaceart.000webhostapp.com/user/report";

  constructor(reporter) {
    this.reporter = reporter;
  }

  /**
   * Preenche todos os atributos
   * @param object
   */
  factory(report) {
    this.id = report.id;
    this.reported = report.reported;
    this.reason = report.reason;
  }

  /**
   * Cria nova denúncia na API
   */
  async create() {
    api
      .post(this.url, {
        reporter: this.reporter,
        reported: this.reported,
        reason: this.reason,
      })
      .then((response) => {
        if (response.status !== status.OK) {
          HTTPRequestError.throw(response.statusText);
        }
      });
  }

  /**
   * Obtém lista de denúncia s de usuário
   * @param int posição de início da leitura
   * @param int limite de itens
   */
  async getList(offset = 0, limit = 10) {
    let response = await api.get(
      `${this.url}?offset=${offset}&limit=${limit}&reporter=${this.reporter}`
    );

    if (response.status !== status.OK) {
      HTTPRequestError.throw(response.statusText);
    }

    return response.data.map((report) =>
      new Report(report.reporter).factory(report)
    ); // Instancia todos as denúncias obtidas
  }
}
