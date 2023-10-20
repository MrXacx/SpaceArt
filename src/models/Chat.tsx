import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";

const { error } = WebServiceClient;

export class Chat extends APISpaceArtClient {
  private id: string | undefined;
  private artist: string | undefined;
  private enterprise: string | undefined;
  public messages = [];

  private path = "https://service-spaceart.000webhostapp.com/chat";

  public factory(chat: {
    id: string | undefined,
    artist: string,
    enterprise: string,
  }) {
    this.id = chat.id;
    this.artist = chat.artist;
    this.enterprise = chat.enterprise;

    return this;
  }

  /**
   * Cria uma conversa
   */
  public async create() {
    let response = await this.request.post(`${this.path}`, {
      artist: this.artist,
      enterprise: this.enterprise,
    });

    if (response.status !== this.httpStatusCode.CREATED) {
      error.HTTPRequestError.throw(
        "Não foi possível enviar uma mensagem para o banco"
      );
    }
  }

  /**
   * Busca uma conversa
   * @returns Chat
   */
  public async fetch(): Promise<Chat> {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        `Não foi possível buscar a conversa ${this.id}`
      );
    }

    return new Chat().factory(response.data);
  }

  /**
   * Busca uma lista de conversas e suas mensagens
   * @param string user
   * @param int offset
   * @param int limit
   * @returns Chat[]
   */
  public async fetchList(user: string, offset = 0, limit = 10): Promise<Chat[]> {
    let response = await this.request.get(
      `${this.path}?offset=${offset}&limit=${limit}user=${user}`
    );

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        "Não foi possível buscar uma lista de conversas"
      );
    }

    return response.data.map((chat: any) => {
      const chatModel = new Chat().factory(chat); // Instancia chat com base no objeto literal

      chatModel.fetchMessages()  // Obtém as mensagens iniciais da conversa
        .then(messages => messages
          .forEach(chatModel.messages.push)); // Armazena mensagens

      return chatModel; // Retorna a conversa
    });
  }

  public async send(sender: string, content: string) {
    let response = await this.request.post(`${this.path}/message`, {
      sender,
      content,
    });

    if (response.status !== this.httpStatusCode.CREATED) {
      error.HTTPRequestError.throw(
        "Não foi possível enviar uma mensagem para o banco"
      );
    }
  }

  /**
   * Busca uma lista de mensagens de uma conversa
   *
   * @param int offset
   * @param int limit
   * @returns Message[]
   */
  public async fetchMessages(offset = 0, limit = 10) {
    let response = await this.request.get(
      `${this.path}/message?offset=${offset}&limit=${limit}&chat=${this.id}`
    );

    if (response.status !== this.httpStatusCode.OK) {
      error.HTTPRequestError.throw(
        `Não foi possível buscar as mensagens do chat ${this.id}`
      );
    }

    return response.data.map((message: any) => new Message(message));
  }
}

class Message {

  private content: string;
  private sender: string;
  private timestamp: string;

  constructor(data: {
    content: string,
    sender: string,
    timestamp: string
  }) {
    this.content = data.content;
    this.sender = data.sender;
    this.timestamp = data.timestamp;
  }

  public toObject(){
    return {
      content: this.content,
      sender: this.sender,
      timestamp: this.timestamp,
    }
  }
}
