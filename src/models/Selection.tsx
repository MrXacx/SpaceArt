import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";
import { Artist } from "./User";
const { request, error, status } = WebServiceClient;

export class Selection extends APISpaceArtClient{
  private id: string | undefined;
  private art: string | undefined;
  private price: number | undefined;
  private owner: string | undefined;

  time: string[] = [];
  date: string[] = [];
  applications: SelectionApplication[] = [];

  path = "service-spaceart.000webhostapp.com/selection";

  /**
   * Preenche todos os atributos
   * @param object
   * @returns Selection
   */
  factory(selection: {
    id: string,
    art: string,
    owner: string,
    price: number,
    date: string[],
    time: string[]
  }) {
    this.id = selection.id;
    this.art = selection.art;
    this.owner = selection.owner;
    this.price = selection.price;
    this.date = selection.date;
    this.time = selection.time;

    return this;
  }

  /**
   * Cria seleção
   */
  async create() {
    let response = await this.request.post(this.path, {
      id: this.id,
      owner: this.owner,
      art: this.art,
      price: this.price,
      date: this.date.join(";"),
      time: this.time.join(";"),
    });

    if (response.status !== this.httpStatusCode.CREATED) {
      error.HTTPRequestError.throw(`Não foi possível criar uma seleção`);
    }
  }

  /**
   * Buca lista de seleções com base num filtro
   * @param int offset
   * @param int limit
   * @param string filter
   * @returns Selection[]
   */
  async fetchList(offset = 0, limit = 15, filter = "owner") {
    let path = `${this.path}/list?offset=${offset}&limit=${limit}`;

    switch (filter) {
      case "owner":
        path += "&owner=" + this.owner;
        break;

      case "art":
        path += "&art=" + this.art;
        break;
        
      default:
        throw new Error("O filtro selecionado não era esperado por este método.");
    }

    let response = await this.request.get(path);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(`Não foi possível buscar uma lista de seleções utilizando o filtro ${filter}`);
    }

    return response.data.map((selection: any) => new Selection().factory(selection));
  }

  /**
   * Busca uma seleção
   * @returns Selection
   */
  async fetch() {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(`Não foi possível encontrar a seleção ${this.id}`);
    }

    let selection = response.data;

    return this.factory({
      id: selection.id as string,
      art: selection.art as string,
      owner: selection.owner as string,
      price: selection.price as number,
      date: (selection.date  as string).split(";"),
      time: (selection.time as string).split(";"),
    });
  }

  /**
   * Deleta uma seleção
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, { id: this.id });

    if (response.status !== this.httpStatusCode.NO_CONTENT) {
      error.HTTPRequestError.throw(
        `Não foi possível deletar a seleção ${this.id}`
      );
    }
  }

  /**
   * Submete um artista à seleção
   * @param Artist artist
   */
  async submitApplication(artist: string) {
    new SelectionApplication().create(artist, this.id as string);
  }

  /**
   * Busca uma lista de seleções
   * @param int offset
   * @param int limit
   * @returns object
   */
  async fetchApplications(offset = 0, limit = 15) {
    let response = await this.request.get(
      `${this.path}/application/list?offset=${offset}&limit=${limit}&selection=${this.id}`
    );

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        `Não foi encontrar aplicações para a seleção ${this.id}`
      );
    }
    return response.data;
  }

  toObject(){
    return {
      id: this.id as string,
      art: this.art as string,
      owner: this.owner as string,
      price: this.price as number,
      date: this.date,
      time: this.time
    }
  }
}

class SelectionApplication extends APISpaceArtClient{
   
  private path = '/selection/application';

  /**
   * Submete um artista à seleção
   * @param Artist artist
   */
   async create(artist: string, selection: string) {
    let response = await this.request.post(`${this.path}`, {artist, selection});

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(`Não foi possível submeter uma aplicação à seleção ${selection}`);
    }
  }

  /**
   * Busca uma lista de seleções
   * @param int offset
   * @param int limit
   * @returns object
   */
  async fetchList(selection: string, offset = 0, limit = 15) {
    let response = await this.request.get(
      `${this.path}/list?offset=${offset}&limit=${limit}&selection=${selection}`
    );

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(`Não foi encontrar aplicações para a seleção ${selection}`);
    }
  }
}