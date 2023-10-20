import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient"

const { error } = WebServiceClient;

export class Rate extends APISpaceArtClient {

  private agreement: string;
  private author: string | undefined;
  private description: string | undefined;
  private rate: number | undefined;

  private path = "/agreement/rate";

  /** 
   * @param string ID do contrato
   */
  constructor(agreement: string) {
    super();
    this.agreement = agreement;
  }

  /** 
   * Preenche todos dos atributos
   */
  public factory(rate: {
    author: string,
    description: string,
    rate: number,
  }) {
    this.author = rate.author;
    this.description = rate.description;
    this.rate = rate.rate;

    return this;
  }

  public async create(): Promise<void> {
    let response = await this.request.post(this.path, {
      agreement: this.agreement,
      author: this.author,
      rate: this.rate,
    });

    if (response.status !== this.httpStatusCode.CREATED) {
      error.HTTPRequestError.throw(
        `Não foi possível adicionar uma avaliação para o contrato ${this.agreement}`
      );
    }
  }

  public async fetchList(): Promise<Rate[]> {

    let response = await this.request.get(
      `${this.path}/list?offset=0&limit=2&agreement=${this.agreement}`
    );

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        `Não foram encontradas avaliações para o contrato ${this.agreement}`
      );
    }

    return response.data.map((rate: any) =>
      new Rate(rate.agreement).factory({
        author: rate.author,
        description: rate.description,
        rate: rate.rate,
      })
    );
  }

  /**
   * Atualiza nota de descrição da avaliação
   */
  public async update() {
    let response = await this.request.post(`${this.path}/update`, {
      agreement: this.agreement,
      author: this.author,
      column: "rate",
      info: this.rate,
    });

    if (response.status !== this.httpStatusCode.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível atualizar a nota de uma avaliação do contrato ${this.agreement}`
      );
    }

    response = await this.request.post(`${this.path}/update`, {
      agreement: this.agreement,
      author: this.author,
      column: "description",
      info: this.description,
    });

    if (response.status !== this.httpStatusCode.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível atualizar a descrição de uma avaliação do contrato ${this.agreement}`
      );
    }
  }

  public async delete() {
    let response = await this.request.post(`${this.path}/delete`, {
      agreement: this.agreement,
      author: this.author,
    });

    if (response.status !== this.httpStatusCode.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível deletar uma avaliação do contrato ${this.agreement}`
      );
    }
  }

  public toObject() {
    return {
      agreement: this.agreement,
      author: this.author,
      description: this.description,
      rate: this.rate,
    }
  }
}