import { Artist, Enterprise } from "./User";
import { IndexedAPIClient, SpaceArtAPIClient } from "./abstracts/APIClient";

export class Selection extends IndexedAPIClient {

  private art: string | undefined;
  private price: number | undefined;
  private owner: Enterprise | undefined;

  time: string[] = [];
  date: string[] = [];
  applications: SelectionApplication[] = [];

  path = "/selection";

  /**
   * Preenche todos os atributos
   */
  factory(selection: {
    id: string,
    art: string,
    owner: Enterprise,
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

    if (response.status !== Selection.httpStatusCode.CREATED) {
      Selection.errorTypes
      .HTTPRequestError
      .throw(`Não foi possível criar uma seleção`);
    }
  }

  /**
   * Buca lista de seleções com base num filtro
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

    if (response.status !== Selection.httpStatusCode.OK) {
      Selection.errorTypes
      .HTTPRequestError
      .throw(`Não foi possível buscar uma lista de seleções utilizando o filtro ${filter}`);
    }

    return response.data.map((selection: any) => new Selection().factory(selection));
  }

  /**
   * Busca uma seleção
   */
  async fetch() {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Selection.httpStatusCode.OK) {
      Selection.errorTypes
      .HTTPRequestError
      .throw(`Não foi possível encontrar a seleção ${this.id}`);
    }

    let selection = response.data;

    return this.factory({
      id: selection.id as string,
      art: selection.art as string,
      owner: selection.owner,
      price: selection.price as number,
      date: (selection.date as string).split(";"),
      time: (selection.time as string).split(";"),
    });
  }

  /**
   * Deleta uma seleção
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, { id: this.id });

    if (response.status !== Selection.httpStatusCode.NO_CONTENT) {
      Selection.errorTypes
      .HTTPRequestError
      .throw(
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

    this.applications.push(application); // Guarda a aplicação realizada no array
  }

  /**
   * Busca uma lista de artistas que se eubmeteram à seleção
   */
  async fetchApplications(offset = 0, limit = 15) {
    let application = new SelectionApplication(this);
    return this.applications = this.applications
      .concat( await application.fetchList(offset, limit));
  }

  toObject() {
    return {
      id: this.id as string,
      art: this.art as string,
      owner: this.owner,
      price: this.price as number,
      date: this.date,
      time: this.time
    }
  }
}

class SelectionApplication extends SpaceArtAPIClient {
  private artist: Artist | undefined;
  private selection: Selection;

  private path = '/selection/application';


  constructor(selection: Selection, artist: Artist | null = null) {
    super();
    
    this.selection = selection;
    this.artist = artist ?? undefined;
  }

  /**
   * Submete um artista à seleção
   * @param Artist artist
   */
  async create() {
    let response = await this.request.post(`${this.path}`, { artist: this.artist?.id, selection: this.selection.getID() });

    if (response.status !== Selection.httpStatusCode.OK) {
      SelectionApplication.errorTypes
      .HTTPRequestError
        .throw(`Não foi possível submeter uma aplicação à seleção ${this.selection.getID()}`);
    }
  }

  /**
   * Busca uma lista de seleções
   */
  async fetchList( offset = 0, limit = 15) {
    let response = await this.request
      .get(`${this.path}/list?offset=${offset}&limit=${limit}&selection=${this.selection.getID()}`);

    if (response.status !== Selection.httpStatusCode.OK) {
      SelectionApplication.errorTypes
      .HTTPRequestError
        .throw(`Não foi encontrar aplicações para a seleção ${this.selection.getID()}`);
    }

    return response.data.map((data: any) => {
      const artist = new Artist();
      artist.id = data.id;
      
      return new SelectionApplication(this.selection, artist);
    })
  }

  toObject() {
    return {
      artist: this.artist,
      selection: this.selection
    }
  }
}