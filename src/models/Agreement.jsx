import { WebServiceClient } from "../services/WebServiceClient";
import { Rate } from "./Rate";

const { request, error, status } = WebServiceClient;

export class Agreement {
  id;
  hirer;
  hired;
  art;
  price;
  staus;
  date = {};
  time = {};
  rates = [];

  url = "https://service-spaceart.000webhostapp.com/agreement";

  /**
   * Preenche todos os atributos
   * @param object agreement
   * @returns Agreement
   */
  factory(agreement) {
    this.id = agreement.id;
    this.hirer = agreement.hirer;
    this.hired = agreement.hired;
    this.art = agreement.art;
    this.price = agreement.price;
    this.date = agreement.date;
    this.time = agreement.time;
    this.status = agreement.status;

    return this;
  }

  /**
   * Cria um contrato
   */
  async create() {
    let response = await request.post(this.url, {
      hirer: this.hirer,
      hired: this.hired,
      art: this.art,
      price: this.price,
      date: Object.entries(this.date).join(";"),
      time: Object.entries(this.time).join(";"),
    });

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw("Não foi possível criar um contrato");
    }
  }

  /**
   * Busca um contrato
   * @returns Agreement
   */
  async fetch() {
    let response = await request.get(`${this.url}?id=${this.id}`);

    if (response.status !== status.OK) {
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
      price: agreement.price.split(";"),
      status: agreement.status,
    });

    agreement.rates = agreement.rates.concat(new Rate(agreement).fetchList()); // Obtém avaliações do contrato

    return agreement;
  }

  /**
   * Busca uma lista de contratos de um  usuário
   * @param User user
   * @param int offset
   * @param int limit
   */
  async fetchList(user, offset = 0, limit = 10) {
    let response = await request.get(`${this.url}/list?user=${user.id}`);

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw(
        `Não foi possível contratos do usuário ${user.id}`
      );
    }

    return response.data.map((agreement) => {
      agreement = new Agreement().factory(agreement);
      agreement.rates = new Rate(agreement).fetchList();
      return agreement;
    });
  }

  /**
   * Deleta um contrato
   */
  async delete() {
    let response = await request.post(`${this.url}/delete`, { id: this.id });

    if (response.status !== status.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível deleter o contrato ${this.id}`
      );
    }
  }
}
