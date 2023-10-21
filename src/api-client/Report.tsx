import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";
const api = WebServiceClient.request;
const HTTPRequestError = WebServiceClient.error.HTTPRequestError;
const status = WebServiceClient.status;

export class Report extends APISpaceArtClient {
  private id: string | undefined;
  private reporter: string;
  private reported: string | undefined;
  private reason: string | undefined;
  private path = "/user/report";

  constructor(reporter: string) {
    super();
    this.reporter = reporter;
  }

  /**
   * Preenche todos os atributos
   * @param object
   */
  factory(report:{
    id: string | undefined,
    reported: string,
    reason: string,
  }) {
    this.id = report.id;
    this.reported = report.reported;
    this.reason = report.reason;
  }

  /**
   * Cria nova denúncia na API
   */
  async create() {
    api
      .post(this.path, this.toObject())
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
      `${this.path}?offset=${offset}&limit=${limit}&reporter=${this.reporter}`
    );

    if (response.status !== status.OK) {
      HTTPRequestError.throw(response.statusText);
    }

    return response.data.map((report: any) =>
      new Report(report.reporter).factory(report)
    ); // Instancia todos as denúncias obtidas
  }

  toObject() {
    return {
      id: this.id as string,
      reporter: this.reporter as string,
      reported: this.reported as string,
      reason: this.reason as string
    }
  }
}
