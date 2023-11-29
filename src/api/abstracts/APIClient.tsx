// Importa a biblioteca Axios
import { Axios } from "axios";
import { HTTPRequestError } from "../../errors/HTTPRequestError"; // Importa classes de erro
import { RegExpError } from "../../errors/RegExpError"; // Importa classes de erro

export abstract class APIClient {
  protected request = new Axios({
    method: "GET",
    responseType: "json",
  });
  protected static httpStatusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
  };
  protected static errorTypes = {
    HTTPRequestError: HTTPRequestError,
    RegExpError: RegExpError,
  };
}

export abstract class SpaceArtAPIClient extends APIClient {
  protected request = new Axios({
    baseURL: "http://https://rest-spaceart.000webhostapp.com",
  });
}

export abstract class IndexedAPIClient extends SpaceArtAPIClient {
  protected id: string | undefined;

  constructor(id?: string) {
    super();
    this.id = id as string;
  }

  setID = (id: string) => (this.id = id);
  getID = () => this.id;
}

export interface APIClientFactory {
  factory(): SpaceArtAPIClient;
}
