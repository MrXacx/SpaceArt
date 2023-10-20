import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";
import { Message } from "./Message";

const { error } = WebServiceClient;

export class Chat extends APISpaceArtClient {
  private id: string | undefined;
  private artist: string | undefined;
  private enterprise: string | undefined;
  private messager = new Message();
  messages = [];

  private path = "/chat";

  factory(chat: {
    id: string | undefined;
    artist: string;
    enterprise: string;
  }) {
    this.id = chat.id;
    this.artist = chat.artist;
    this.enterprise = chat.enterprise;

    return this;
  }

  /**
   * Cria uma conversa
   */
  async create() {
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
  async fetch(): Promise<Chat> {
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
  async fetchList(user: string, offset = 0, limit = 10): Promise<Chat[]> {
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

      chatModel
        .fetchMessages() // Obtém as mensagens iniciais da conversa
        .then((messages: any) => messages.forEach(chatModel.messages.push)); // Armazena mensagens

      return chatModel; // Retorna a conversa
    });
  }

  sendMessage = async (sender: string, content: string) =>
    this.messager.create(this.id as string, sender, content);

  /**
   * Busca uma lista de mensagens de uma conversa
   *
   * @param int offset
   * @param int limit
   * @returns Message[]
   */
  fetchMessages = async (offset = 0, limit = 10) =>
    this.messager.fetchList(this.id as string, offset, limit);
}