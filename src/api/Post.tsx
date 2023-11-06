import { User } from "./User";
import { IndexedAPIClient, APIClientFactory } from "./abstracts/APIClient";


export class Post extends IndexedAPIClient implements APIClientFactory {
  private author: User | undefined;
  private message: string | undefined;
  private media: string | undefined;
  private postTime: string | undefined;

  private path = "/post";

  factory = () => new Post();

  build(post: {
    id?: string,
    post_time?: string,
    author?: User,
    message?: string,
    media?: string,
  }): this {
    this.id = post.id;
    this.postTime = post.post_time;
    this.author = post.author;
    this.message = post.message;
    this.media = post.media;

    return this;
  }

  /**
   * Cria a postagem
   */
  async create() {
    let response = await this.request.post(this.path, JSON.stringify({
      author: this.author?.getID(),
      message: this.message as string,
      media: this.media as string,
    }));

    if (response.status !== Post.httpStatusCode.CREATED) {
      Post.errorTypes
        .HTTPRequestError.throw("Não foi possível publicar uma postagem");
    }
  }

  /** 
   * Busca a postagem
   */
  async fetch() {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Post.httpStatusCode.OK) {
      Post.errorTypes
        .HTTPRequestError.throw(`Não foi possível buscar a postagem ${this.id}`);
    }

    const data = JSON.parse(response.data);
    data.author = new User(data.author);
    return this.factory().build(data);

  }

  /**
   * Busca uma lista de postagens
   */
  async fetchList(offset = 0, limit = 25) {
    let response = await this.request.get(`${this.path}/list?offset=${offset}&limit=${limit}`);

    if (response.status !== Post.httpStatusCode.OK) {
      Post.errorTypes
        .HTTPRequestError.throw("Não foi possível buscar uma lista de postagens");
    }

    return JSON.parse(response.data).map((post: any) => {
      post.author = new User(post.author);
      return this.factory().build(post);
    });
  }

  /**
  * Busca uma lista de postagens associadas a um usuário
  */
  async fetchListByAuthor(offset = 0, limit = 25) {
    let response = await this.request.get(`${this.path}/list?references=author&author=${this.author?.getID()}offset=${offset}&limit=${limit}`);

    if (response.status !== Post.httpStatusCode.OK) {
      Post.errorTypes
        .HTTPRequestError.throw("Não foi possível buscar uma lista de postagens");
    }

    return JSON.parse(response.data).map((post: any) => {
      post.author = this.author;
      return this.factory().build(post);
    });
  }

  /**
   * Deleta a postagem
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, JSON.stringify({ id: this.id }));

    if (response.status !== Post.httpStatusCode.NO_CONTENT) {
      Post.errorTypes
        .HTTPRequestError.throw("Não foi possível deletar uma postagem");
    }
  }

  toObject() {
    return {
      id: this.id,
      author: this.author,
      message: this.message,
      media: this.media,
      postTime: this.postTime,
    }
  }
}
