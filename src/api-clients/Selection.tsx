import { Artist, Enterprise } from "./User";
import { IndexedAPIClient, SpaceArtAPIClient, APIClientFactory } from "./abstracts/APIClient";

export class Selection extends IndexedAPIClient implements APIClientFactory {

  private art: string | undefined;
  private price: number | undefined;
  private owner: Enterprise | undefined;

  time: string[] = [];
  date: string[] = [];
  applications: SelectionApplication[] = [];

  path = "/selection";

  factory = () => new Selection();

  /**
   * Preenche todos os atributos
   */
  build(selection: {
    id?: string,
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
      owner: this.owner?.getID(),
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
        path += "&owner=" + this.owner?.getID();
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

    return response.data.map((selection: any) =>
      new Selection().build({
        id: selection.id,
        art: selection.art,
        owner: new Enterprise(selection.enterprise),
        price: selection.price,
        date: Object.entries(selection.date).map(item => item[1] as string),
        time: Object.entries(selection.time).map(item => item[1] as string)
      })
    );
  }

  /**
   * Busca uma seleção
   */
  async fetch() {
    const response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Selection.httpStatusCode.OK) {
      Selection.errorTypes
        .HTTPRequestError
        .throw(`Não foi possível encontrar a seleção ${this.id}`);
    }

    const selection = response.data;

    return this.factory().build({
      id: selection.id as string,
      art: selection.art as string,
      owner: new Enterprise(selection.owner),
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
      .concat(await application.fetchList(offset, limit));
  }

  toObject() {
    return {
      id: this.id,
      art: this.art,
      owner: this.owner,
      price: this.price,
      date: this.date,
      time: this.time,
      applications: this.applications,
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
    let response = await this.request.post(`${this.path}`, { artist: this.artist?.getID(), selection: this.selection.getID() });

    if (response.status !== Selection.httpStatusCode.OK) {
      SelectionApplication.errorTypes
        .HTTPRequestError
        .throw(`Não foi possível submeter uma aplicação à seleção ${this.selection.getID()}`);
    }
  }

  /**
   * Busca uma lista de seleções
   */
  async fetchList(offset = 0, limit = 15) {
    let response = await this.request
      .get(`${this.path}/list?offset=${offset}&limit=${limit}&selection=${this.selection.getID()}`);

    if (response.status !== Selection.httpStatusCode.OK) {
      SelectionApplication.errorTypes
        .HTTPRequestError
        .throw(`Não foi encontrar aplicações para a seleção ${this.selection.getID()}`);
    }

    return response.data.map((data: any) =>
      new SelectionApplication(this.selection, new Artist(data.artist))
    )
  }

  toObject() {
    return {
      artist: this.artist,
      selection: this.selection
    }
  }
}