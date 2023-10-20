import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";
const { status, request, error } = WebServiceClient;

export class Post extends APISpaceArtClient{
  private id: string | undefined;
  private author: string | undefined;
  private content: string | undefined;
  private media: string | undefined;

  private path = "/post";

  factory(post:{
    id: string,
    author: string,
    content: string,
    media: string,
  }): this {
    this.id = post.id;
    this.author = post.author;
    this.content = post.content;
    this.media = post.media;

    return this;
  }

  /**
   * Cria a postagem
   */
  async create() {
    let response = await this.request.post(this.path, this.toObject());

    if (response.status !== this.httpStatusCode.CREATED) {
      error.HTTPRequestError.throw("Não foi possível publicar uma postagem");
    }
  }

  /** 
   * Busca a postagem
   */
  async fetch() {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(`Não foi possível buscar a postagem ${this.id}`);
    }

    return response.data.map((post: any) => new Post().factory(post));
  }

  /**
   * Busca uma lista de postagens
   * @param int offset
   * @param int limite
   */
  async fetchList(offset = 0, limit = 25) {
    let response = await this.request.get(`${this.path}/list?offset=${offset}&limit=${limit}`);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw("Não foi possível buscar uma lista de postagens");
    }

    return response.data.map((post: any) => new Post().factory(post));
  }

  /**
   * Deleta a postagem
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, { id: this.id });

    if (response.status !== this.httpStatusCode.NO_CONTENT) {
      error.HTTPRequestError.throw("Não foi possível deletar uma postagem");
    }
  }

  toObject(){
    return {
      id: this.id as string,
      author: this.author as string,
      content: this.content as string,
      media: this.media as string,
    }
  }
}
