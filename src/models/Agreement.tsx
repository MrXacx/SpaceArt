import { WebServiceClient } from "../services/WebServiceClient";
import { Rate } from "./Rate";
import { APISpaceArtClient } from "./APISpaceArtClient";

const { error } = WebServiceClient;

export class Agreement extends APISpaceArtClient {
  private id: string | undefined;
  private hirer: string | undefined;
  private hired: string | undefined;
  private art: string | undefined;
  private price: number | undefined;
  private status: string | undefined;

  private date: string[] | undefined;
  private time: string[] | undefined;
  public rates: Rate[] = [];

  private path = '/agreement';

  /**
   * Preenche todos os atributos
   * @param object agreement
   * @returns Agreement
   */
  public factory(agreement: {
    id: string | undefined,
    hirer: string | undefined,
    hired: string | undefined,
    art: string | undefined,
    price: number | undefined,
    date: string[] | undefined,
    time: string[] | undefined,
    status: string | undefined,
  }): Agreement {
    this.id = agreement.id;
    this.hirer = agreement.hirer;
    this.hired = agreement.hired;
    this.art = agreement.art;
    this.price = agreement.price;
    this.date = agreement.date ?? [];
    this.time = agreement.time ?? [];
    this.status = agreement.status;

    return this;
  }

  /**
   * Cria um contrato
   */
  public async create(): Promise<void> {
    let response = await this.request.post(this.path, {
      hirer: this.hirer,
      hired: this.hired,
      art: this.art,
      price: this.price,
      date: this.date?.join(";"),
      time: this.time?.join(";"),
    });

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw("Não foi possível criar um contrato");
    }
  }

  /**
   * Busca um contrato
   * @returns Agreement
   */
  async fetch(): Promise<Agreement> {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        `Não foi possível encontrar o contrato ${this.id}`
      );
    }

    let agreement = response.data;

    agreement = new Agreement().factory({
      id: agreement.id,
      hirer: agreement.hirer,
      hired: agreement.hired,
      art: agreement.art,
      price: agreement.price,
      date: agreement.date.split(";"),
      time: agreement.time.split(";"),
      status: agreement.status,
    });

    agreement.rates = agreement.rates.concat(new Rate(agreement).fetchList()); // Obtém avaliações do contrato

    return agreement;
  }

  /**
   * Busca uma lista de contratos de um  usuário
   * @param string user
   * @param int offset
   * @param int limit
   */
  public async fetchList(user: string, offset = 0, limit = 10): Promise<Agreement[]> {
    let response = await this.request.get(`${this.path}/list?user=${user}&offset=${offset}&limit=${limit}`);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        `Não foi possível contratos do usuário ${user}`
      );
    }

    return response.data.map((data: any): Agreement => { // Itera lista de contratos
      const agreement = new Agreement().factory(data); // Instancia o contrato

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

    if (response.status !== this.httpStatusCode.NO_CONTENT) {
      error.HTTPRequestError.throw(
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
      date: {
        initial: this.date?.at(0),
        final: this.date?.at(1),
      },
      time: {
        initial: this.date?.at(0),
        final: this.date?.at(1),
      }
    }
  }
}
