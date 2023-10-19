import { WebServiceClient } from "../services/WebServiceClient";
import { Agreement } from "./Agreement";

const { request, error, status } = WebServiceClient;

export class Rate {
  agreement;
  author;
  description;

  url = "https://service-spaceart.000webhostapp.com/agreement/rate";

  constructor(agreement) {
    this.agreement = agreement;
  }

  factory(rate) {
    this.author = rate.author;
    this.description = rate.description;

    return this;
  }

  async submit(author, rate) {
    let response = await request.post(this.url, {
      agreement: this.agreement.id,
      author,
      rate,
    });

    if (response.status !== status.CREATED) {
      error.HTTPRequestError.throw(
        `Não foi possível adicionar uma avaliação para o contrato ${this.agreement.id}`
      );
    }
  }

  async fetchList() {
    let response = await request.get(
      `${this.url}/list?offset=0&limit=2&agreement=${this.agreement.id}`
    );

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw(
        `Não foram encontradas avaliações para o contrato ${this.agreement.id}`
      );
    }

    return response.data.map((rate) =>
      new Rate(new Agreement().factory({ id: rate.agreement })).factory({
        author: rate.author,
        rate: rate.rate,
      })
    );
  }

  async update(author, rate, description) {
    let reponse = await request.post(`${this.url}/update`, {
      agreement: this.id,
      author,
      column: "rate",
      info: rate,
    });

    if (rateResponse.status !== status.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível atualizar a nota de uma avaliação do contrato ${this.agreement.id}`
      );
    }

    reponse = await request.post(`${this.url}/update`, {
      agreement: this.id,
      author,
      column: "description",
      info: description,
    });

    if (rateResponse.status !== status.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível atualizar a descrição de uma avaliação do contrato ${this.agreement.id}`
      );
    }
  }

  async delete(author) {
    let reponse = await request.post(`${this.url}/delete`, {
      agreement: this.id,
      author,
    });

    if (reponse.status !== status.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível deletar uma avaliação do contrato ${this.agreement.id}`
      );
    }
  }
}
