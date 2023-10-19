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

  async delete() {
    let response = await request.post(`${this.url}/delete`, {
      author: this.author,
      content: this.content,
      media: this.media,
    });

    if (response.status !== status.NO_CONTENT) {
      error.HTTPRequestError.throw("Não foi possível deletar uma postagem");
    }
  }
}
