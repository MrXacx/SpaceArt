import { IndexedAPIClient, APIClientFactory } from "./abstracts/APIClient";
import { Message } from "./Message";
import { Artist, Enterprise, User } from "./User";

export class Chat extends IndexedAPIClient implements APIClientFactory {
  private artist: Artist | undefined;
  private enterprise: Enterprise | undefined;
  private lastMessage: string | undefined;

  messages: Message[] = [];

  factory = () => new Chat();

  private path = "/chat";

  build(chat: {
    id?: string;
    last_message?: string;
    artist: Artist;
    enterprise: Enterprise;
  }) {
    this.id = chat.id;
    this.lastMessage = chat.last_message;
    this.artist = chat.artist;
    this.enterprise = chat.enterprise;

    return this;
  }

  /**
   * Cria uma conversa
   */
  async create() {
    let response = await this.request.post(
      `${this.path}`,
      JSON.stringify({
        artist: this.artist?.getID(),
        enterprise: this.enterprise?.getID(),
      })
    );

    if (response.status !== Chat.httpStatusCode.CREATED) {
      Chat.errorTypes.HTTPRequestError.throw(
        "Não foi possível enviar uma mensagem para o banco"
      );
    }
  }

  /**
   * Busca uma conversa
   */
  async fetch() {
    let response = await this.request.get(`${this.path}?id=${this.id}`);

    if (response.status !== Chat.httpStatusCode.OK) {
      Chat.errorTypes.HTTPRequestError.throw(
        `Não foi possível buscar a conversa ${this.id}`
      );
    }

    const chatData = JSON.parse(response.data);
    return this.factory().build({
      ...chatData,
      artist: new Artist(chatData.artist),
      enterprise: new Enterprise(chatData.enterprise),
    });
  }

  /**
   * Busca uma lista de conversas e suas mensagens
   */
  async fetchList(user: User, offset = 0, limit = 10): Promise<Chat[]> {
    let response = await this.request.get(
      `${this.path}/list?offset=${offset}&limit=${limit}&user=${user.getID()}`
    );

    if (response.status !== Chat.httpStatusCode.OK) {
      Chat.errorTypes.HTTPRequestError.throw(
        "Não foi possível buscar uma lista de conversas"
      );
    }

    return JSON.parse(response.data).map(
      (chat: any) =>
        this.factory().build({
          ...chat,
          artist: new Artist(chat.artist),
          enterprise: new Enterprise(chat.enterprise),
        }) // Instancia chat com base no objeto literal
    );
  }

  sendMessage = async (sender: User, content: string) =>
    new Message(this).build({ content, sender }).create();

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
  };

  toObject() {
    return {
      id: this.id,
      artist: this.artist,
      enterprise: this.enterprise,
      lastMessage: this.lastMessage,
      messages: this.messages,
    };
  }
}
