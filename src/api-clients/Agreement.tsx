import { Rate } from "./Rate";
import { Artist, Enterprise, User } from "./User";
import { IndexedAPIClient, APIClientFactory } from "./abstracts/APIClient";

export class Agreement extends IndexedAPIClient implements APIClientFactory {
  private hirer: Enterprise | undefined;
  private hired: Artist | undefined;
  private art: string | undefined;
  private price: number | undefined;
  private status: string | undefined;
  private description: string | undefined;
  private date: string | undefined;
  private time: string[] | undefined;
  public rates: Rate[] = [];

  private path = '/agreement';

  factory = () => new Agreement();

  /**
   * Preenche todos os atributos
   * @param object agreement
   * @returns Agreement
   */
  public build(agreement: {
    id?: string,
    hirer: Enterprise,
    hired: Artist,
    description: string,
    art: string,
    price: number,
    date: string,
    time: string[],
    status?: string,
  }): Agreement {
    this.id = agreement.id;
    this.hirer = agreement.hirer;
    this.hired = agreement.hired;
    this.description = agreement.description;
    this.art = agreement.art;
    this.price = agreement.price;
    this.date = agreement.date;
    this.time = agreement.time ?? [];
    this.status = agreement.status;

    return this;
  }

  /**
   * Cria um contrato
   */
  public async create() {
    let response = await this.request.post(this.path, {
      hirer: this.hirer?.getID(),
      hired: this.hired?.getID(),
      art: this.art,
      description: this.description,
      price: this.price,
      date: this.date,
      time: this.time?.join(";"),
    });

    if (response.status !== Agreement.httpStatusCode.OK) {
      Agreement.errorTypes.HTTPRequestError.throw("Não foi possível criar um contrato");
    }
  }

  /**
   * Busca um contrato
   * @returns Agreement
   */
  async fetch(): Promise<Agreement> {
    const response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Agreement.httpStatusCode.OK) {
      Agreement.errorTypes
        .HTTPRequestError
        .throw(`Não foi possível encontrar o contrato ${this.id}`);
    }

    const agreementData = response.data;

    const agreement = this.factory().build({
      id: agreementData.id,
      hirer: new Enterprise(agreementData.hirer),
      hired: new Artist(agreementData.hired),
      art: agreementData.art,
      price: agreementData.price,
      date: agreementData.date,
      time: Object.entries(agreementData.time).map(item => item[1] as string),
      status: agreementData.status,
      description: agreementData.description,
    });

    agreement.rates = agreement.rates.concat(await new Rate(agreement).fetchList()); // Obtém avaliações do contrato

    return agreement;
  }

  /**
   * Busca uma lista de contratos de um  usuário
   * @param string user
   * @param int offset
   * @param int limit
   */
  public async fetchList(user: User, offset = 0, limit = 10): Promise<Agreement[]> {
    let response = await this.request.get(`${this.path}/list?user=${user.getID()}&offset=${offset}&limit=${limit}`);

    if (response.status !== Agreement.httpStatusCode.OK) {
      Agreement.errorTypes.HTTPRequestError.throw(
        `Não foi possível contratos do usuário ${user.getID()}`
      );
    }

    return response.data.map((data: any) => { // Itera lista de contratos
      const agreement = this.factory().build(data); // Instancia o contrato

      if (data.status === "accepted") { // Executa apenas se o contrato já foi aceito
        const rate = new Rate(data.id); // Instancia avaliação
        rate.fetchList() // Busca as avaliações associadas no banco
          .then(rates => agreement.rates = rates); // Associa avaliações ao contrato
      }

      return agreement;

    });
  }

  /**
   * Deleta um contrato
   */
  public async delete() {
    let response = await this.request.post(`${this.path}/delete`, { id: this.id });

    if (response.status !== Agreement.httpStatusCode.NO_CONTENT) {
      Agreement.errorTypes.HTTPRequestError.throw(
        `Não foi possível deleter o contrato ${this.id}`
      );
    }
  }

  public toObject() {
    return {
      id: this.id,
      hirer: this.hirer,
      hired: this.hired,
      price: this.price,
      art: this.art,
      status: this.status,
      date: this.date,
      time: this.time,
      description: this.description,
      rates: this.rates,
    }
  }
}