import { User } from "./User";
import { IndexedAPIClient } from "./abstracts/APIClient";

export class Report extends IndexedAPIClient {
  private reporter: User;
  private reported: User | undefined;
  private reason: string | undefined;
  private path = "/user/report";

  constructor(reporter: User) {
    super();
    this.reporter = reporter;
  }

  /**
   * Preenche todos os atributos
   * @param object
   */
  factory(report: {
    id: string | undefined,
    reported: User,
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
    let response = await this.request.post(this.path, {
      reporter: this.reporter.getID(),
      reported: this.reported?.getID(),
      reason: this.reason as string
    });

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

    return response.data.map((report: any) => {
      report.reported = new User(report.reported);
      return new Report(this.reporter).factory(report)
    }); // Instancia todos as denúncias obtidas
  }

  toObject() {
    return {
      id: this.id as string,
      reporter: this.reporter,
      reported: this.reported,
      reason: this.reason as string
    }
  }
}
