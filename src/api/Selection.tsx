import { ArtType } from "../enums/ArtType";
import { Artist, Enterprise } from "./User";
import {
  IndexedAPIClient,
  SpaceArtAPIClient,
  APIClientFactory,
} from "./abstracts/APIClient";

export class Selection extends IndexedAPIClient implements APIClientFactory {
  private art?: string;
  private price?: number;
  private owner?: Enterprise;
  private locked?: boolean;
  private time?: string[];
  private date?: string[];
  private title?: string;

  path = "/selection";

  factory = () => new Selection();

  /**
   * Preenche todos os atributos
   */
  build(selection: {
    id?: string;
    title?: string;
    art?: ArtType | string;
    owner?: Enterprise;
    price?: number;
    date?: string[];
    time?: string[];
    locked?: boolean;
  }) {
    this.id = selection.id;
    this.title = selection.title;
    this.art = selection.art;
    this.owner = selection.owner;
    this.price = selection.price;
    this.date = selection.date;
    this.time = selection.time;
    this.locked = selection.locked;

    return this;
  }

  /**
   * Cria seleção
   */
  async create() {
    let response = await this.request.post(
      this.path,
      JSON.stringify({
        owner: this.owner?.getID(),
        title: this.title,
        art: this.art,
        price: this.price,
        date: this.date?.join(";"),
        time: this.time?.join(";"),
      })
    );

    if (response.status !== Selection.httpStatusCode.CREATED) {
      Selection.errorTypes.HTTPRequestError.throw(
        `Não foi possível criar uma seleção`
      );
    }
  }

  /**
   * Buca lista de seleções com base num filtro
   */
  async fetchList(
    offset = 0,
    limit = 15,
    filter = "owner"
  ): Promise<Selection[]> {
    let path = `${this.path}/list?offset=${offset}&limit=${limit}`;

    switch (filter) {
      case "owner":
        path += "&filter=owner&owner=" + this.owner?.getID();
        break;

      case "art":
        path += "&filter=art&art=" + this.art;
        break;

      default:
        throw new Error(
          "O filtro selecionado não era esperado por este método."
        );
    }

    let response = await this.request.get(path);

    if (response.status !== Selection.httpStatusCode.OK) {
      Selection.errorTypes.HTTPRequestError.throw(
        `Não foi possível buscar uma lista de seleções utilizando o filtro ${filter}`
      );
    }

    return JSON.parse(response.data).map((selection: any) =>
      new Selection().build({
        id: selection.id,
        title: selection.title,
        art: selection.art,
        owner: new Enterprise(selection.enterprise),
        price: selection.price,
        date: Object.entries(selection.date).map((item) => item[1] as string),
        time: Object.entries(selection.time).map((item) => item[1] as string),
      })
    );
  }

  /**
   * Busca uma seleção
   */
  async fetch(): Promise<Selection> {
    const response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Selection.httpStatusCode.OK) {
      Selection.errorTypes.HTTPRequestError.throw(
        `Não foi possível encontrar a seleção ${this.id}`
      );
    }

    const selection = JSON.parse(response.data);

    return this.factory().build({
      id: selection.id as string,
      title: selection.title,
      art: selection.art as string,
      owner: new Enterprise(selection.owner),
      price: selection.price as number,
      date: (selection.date as string).split(";"),
      time: (selection.time as string).split(";"),
      locked: this.locked,
    });
  }

  /**
   * Deleta uma seleção
   */
  async delete() {
    let response = await this.request.post(
      `${this.path}/delete`,
      JSON.stringify({ id: this.id })
    );

    if (response.status !== Selection.httpStatusCode.NO_CONTENT) {
      Selection.errorTypes.HTTPRequestError.throw(
        `Não foi possível deletar a seleção ${this.id}`
      );
    }
  }

  /**
   * Submete um artista à seleção
   */
  async submitApplication(artist: Artist) {
    let application = new SelectionApplication(this, artist);
    application.create(); // Cria aplicação
  }

  /**
   * Busca uma lista de artistas que se eubmeteram à seleção
   */
  async fetchApplications(
    offset = 0,
    limit = 15
  ): Promise<SelectionApplication[]> {
    let application = new SelectionApplication(this);
    return application.fetchList(offset, limit);
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      art: this.art,
      owner: this.owner,
      price: this.price,
      date: this.date,
      time: this.time,
    };
  }
}

class SelectionApplication extends SpaceArtAPIClient {
  private artist?: Artist;
  private selection: Selection;

  private path = "/selection/application";

  constructor(selection: Selection, artist?: Artist) {
    super();

    this.selection = selection;
    this.artist = artist ?? undefined;
  }

  /**
   * Submete um artista à seleção
   * @param Artist artist
   */
  async create() {
    let response = await this.request.post(
      `${this.path}`,
      JSON.stringify({
        user: this.artist?.getID(),
        selection: this.selection.getID(),
      })
    );

    if (response.status !== Selection.httpStatusCode.CREATED) {
      SelectionApplication.errorTypes.HTTPRequestError.throw(
        `Não foi possível submeter uma aplicação à seleção ${this.selection.getID()}`
      );
    }
  }

  /**
   * Busca uma lista de seleções
   */
  async fetchList(offset = 0, limit = 15) {
    let response = await this.request.get(
      `${
        this.path
      }/list?offset=${offset}&limit=${limit}&selection=${this.selection.getID()}`
    );

    if (response.status !== Selection.httpStatusCode.OK) {
      SelectionApplication.errorTypes.HTTPRequestError.throw(
        `Não foi encontrar aplicações para a seleção ${this.selection.getID()}`
      );
    }

    return JSON.parse(response.data).map(
      (data: any) =>
        new SelectionApplication(this.selection, new Artist(data.user))
    );
  }

  toObject() {
    return {
      artist: this.artist,
      selection: this.selection,
    };
  }
}
