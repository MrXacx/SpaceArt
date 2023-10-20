import { WebServiceClient } from "../services/WebServiceClient";

const { status, request, error } = WebServiceClient;

export class Post {
  id;
  author;
  content;
  media;
  url = "https://service-spaceart.000webhostapp/post";

  factory(post) {
    this.id = post.id;
    this.author = post.author;
    this.content = post.content;
    this.media = post.media;
  }

  /**
   * Cria a postagem
   */
  async create() {
    let response = await request.post(this.url, {
      author: this.author,
      content: this.content,
      media: this.media,
    });

    if (response.status !== status.CREATED) {
      error.HTTPRequestError.throw("Não foi possível publicar uma postagem");
    }
  }

  /** 
   * Busca a postagem
   */
  async fetch() {
    let response = await request.get(`${this.url}?id=${this.id}`);

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw(`Não foi possível buscar a postagem ${this.id}`);
    }

    return response.data.map(post => new Post().factory(post));
  }

  /**
   * Busca uma lista de postagens
   * @param int offset
   * @param int limite
   */
  async fetchList(offset = 0, limit = 25) {
    let response = await request.get(`${this.url}/list?offset=${offset}&limit=${limit}`);

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw("Não foi possível buscar uma lista de postagens");
    }

    return response.data.map(post => new Post().factory(post));
  }

  /**
   * Deleta a postagem
   */
  async delete() {
    let response = await request.post(`${this.url}/delete`, { id: this.id });

    if (response.status !== status.NO_CONTENT) {
      error.HTTPRequestError.throw("Não foi possível deletar uma postagem");
    }
  }
}
