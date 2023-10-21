import { IndexedAPIClient } from "./abstracts/APIClient";
import { Message } from "./Message";
import { Artist, Enterprise, User } from "./User";

export class Chat extends IndexedAPIClient {

  private artist: Artist | undefined;
  private enterprise: Enterprise | undefined;

  messages: Message[] = [];

  private path = "/chat";

  factory(chat: {
    id: string | undefined;
    artist: Artist;
    enterprise: Enterprise;
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
      artist: this.artist?.getID(),
      enterprise: this.enterprise?.getID(),
    });

    if (response.status !== Chat.httpStatusCode.CREATED) {
      Chat.errorTypes
        .HTTPRequestError.throw("Não foi possível enviar uma mensagem para o banco");
    }
  }

  /**
   * Busca uma conversa
   */
  async fetch() {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Chat.httpStatusCode.OK) {
      Chat.errorTypes
        .HTTPRequestError
        .throw(`Não foi possível buscar a conversa ${this.id}`);
    }

    const chatData = response.data;
    chatData.artist = new Artist(chatData.artist)
    chatData.enterprise = new Enterprise(chatData.enterprise);

    return new Chat().factory(chatData);
  }

  /**
   * Busca uma lista de conversas e suas mensagens
   */
  async fetchList(user: User, offset = 0, limit = 10): Promise<Chat[]> {
    let response = await this.request.get(
      `${this.path}?offset=${offset}&limit=${limit}user=${user.getID()}`
    );

    if (response.status !== Chat.httpStatusCode.OK) {
      Chat.errorTypes
        .HTTPRequestError.throw(
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

  sendMessage = async (sender: User, content: string) =>
    new Message(this).factory({ content, sender, timestamp: '' }).create();

  /**
   * Busca uma lista de mensagens de uma conversa
   *
   * @param int offset
   * @param int limit
   * @returns Message[]
   */
  fetchMessages = async (offset = 0, limit = 10) => {
    const list = await new Message(this).fetchList(offset, limit);
    list.forEach(this.messages.push);
    return list;
  }
}