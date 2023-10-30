import { User } from "./User";
import { IndexedAPIClient, APIClientFactory } from "./abstracts/APIClient";

export class Report extends IndexedAPIClient implements APIClientFactory {
  private reporter: User;
  private reported: User | undefined;
  private reason: string | undefined;
  private accepted: boolean | undefined;

  private path = "/user/report";

  constructor(reporter: User) {
    super();
    this.reporter = reporter;
  }

  factory = () => new Report(this.reporter);

  /**
   * Preenche todos os atributos
   * @param object
   */
  build(report: {
    id?: string,
    accepted?: boolean,
    reported: User,
    reason: string,
  }) {
    this.id = report.id;
    this.reported = report.reported;
    this.reason = report.reason;
    this.accepted = report.accepted;
  }

  /**
   * Cria nova denúncia na API
   */
  async create() {
    const response = await this.request.post(this.path, JSON.stringify({
      reporter: this.reporter.getID(),
      reported: this.reported?.getID(),
      reason: this.reason as string
    }));

    if (response.status !== Report.httpStatusCode.OK) {
      Report.errorTypes
        .HTTPRequestError
        .throw(response.statusText);
    }
  }

  /**
   * Obtém lista de denúncia s de usuário
   */
  async fetcList(offset = 0, limit = 10) {
    let response = await this.request.get(
      `${this.path}?offset=${offset}&limit=${limit}&reporter=${this.reporter.getID()}`
    );

    if (response.status !== Report.httpStatusCode.OK) {
      Report.errorTypes
        .HTTPRequestError
        .throw(response.statusText);
    }

    return JSON.parse(response.data).map((report: any) => {
      report.reported = new User(report.reported);
      return this.factory().build(report)
    }); // Instancia todos as denúncias obtidas
  }

  toObject() {
    return {
      id: this.id,
      reporter: this.reporter,
      reported: this.reported,
      reason: this.reason,
      accepted: this.accepted,
    }
  }
}
