import { User } from "./User";
import { IndexedAPIClient, APIClientFactory } from "./abstracts/APIClient";


export class Post extends IndexedAPIClient implements APIClientFactory {
  private author: User | undefined;
  private content: string | undefined;
  private media: string | undefined;
  private postTime: string | undefined;

  private path = "/post";

  factory = () => new Post();

  build(post: {
    id?: string,
    post_time?: string,
    author: User,
    content: string,
    media: string,
  }): this {
    this.id = post.id;
    this.postTime = post.post_time;
    this.author = post.author;
    this.content = post.content;
    this.media = post.media;

    return this;
  }

  /**
   * Cria a postagem
   */
  async create() {
    let response = await this.request.post(this.path, {
      author: this.author?.getID(),
      content: this.content as string,
      media: this.media as string,
    });

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
   * @param int offset
   * @param int limite
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
   * Deleta a postagem
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, { id: this.id });

    if (response.status !== Post.httpStatusCode.NO_CONTENT) {
      Post.errorTypes
        .HTTPRequestError.throw("Não foi possível deletar uma postagem");
    }
  }

  toObject() {
    return {
      id: this.id,
      author: this.author,
      content: this.content,
      media: this.media,
      postTime: this.postTime,
    }
  }
}
