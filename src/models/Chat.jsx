import { WebServiceClient } from "../services/WebServiceClient";

const { request, status, error } = WebServiceClient;

export class Chat {
  id;
  artist;
  enterprise;
  messages = [];

  url = "https://service-spaceart.000webhostapp.com/chat";

  factory(chat) {
    this.id = chat.id;
    this.artist = chat.artist;
    this.enterprise = chat.enterprise;

    return this;
  }

  /**
   * Cria uma conversa
   */
  async create() {
    let response = await request.post(`${this.url}`, {
      artist: this.artist,
      enterprise: this.enterprise,
    });

    if (response !== status.CREATED) {
      error.HTTPRequestError.throw(
        "Não foi possível enviar uma mensagem para o banco"
      );
    }
  }

  /**
   * Busca uma conversa
   * @returns Chat
   */
  async fetch() {
    let response = await request.get(`${this.url}?id=${this.id}`);

    if (response.status !== status.OK) {
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
  async fetchList(user, offset = 0, limit = 10) {
    let response = await request.get(
      `${this.url}?offset=${offset}&limit=${limit}user=${user}`
    );

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw(
        "Não foi possível buscar uma lista de conversas"
      );
    }

    return response.data.map((chat) => {
      const chatModel = new Chat().factory(chat); // Instancia chat com base no objeto literal
      chatModel.fetchMessages().forEach(chatModel.messages.push); // Obtém as mensagens iniciais da conversa
      return chatModel; // Retorna a conversa
    });
  }

  async send(sender, content) {
    let response = await request.post(`${this.url}/message`, {
      sender,
      content,
    });

    if (response !== status.CREATED) {
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
   * @returns object[]
   */
  async fetchMessages(offset = 0, limit = 10) {
    let response = await request.get(
      `${this.url}/message?offset=${offset}&limit=${limit}&chat=${this.id}`
    );

    if (response.status !== status.OK) {
      error.HTTPRequestError.throw(
        `Não foi possível buscar as mensagens do chat ${this.id}`
      );
    }

    return response.data.map((message) => {
      return {
        content: message.content,
        sender: message.sender,
        timestamp: message.timestamp,
      };
    });
  }
}
