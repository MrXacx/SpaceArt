import { Chat } from "./Chat";
import { User } from "./User";
import { SpaceArtAPIClient, APIClientFactory } from "./abstracts/APIClient";

export class Message extends SpaceArtAPIClient implements APIClientFactory {
  private content: string | undefined;
  private sender: User | undefined;
  private timestamp: string | undefined;

  private path = "/chat/message";

  constructor(private readonly chat: Chat) { super() }

  factory = () => new Message(this.chat);

  build(data: { sender: User; content: string; timestamp?: string }) {
    this.content = data.content;
    this.sender = data.sender;
    this.timestamp = data.timestamp;

    return this;
  }

  async create() {
    let response = await this.request.post(this.path, {
      chat: this.chat.getID(),
      sender: this.sender?.getID(),
      content: this.content,
    });

    if (response.status !== Message.httpStatusCode.CREATED) {
      Message
        .errorTypes
        .HTTPRequestError
        .throw("Não foi possível criar uma mensagem no banco");
    }
  }

  /**
   * Busca uma lista de mensagens de uma conversa
   */
  async fetchList(offset = 0, limit = 10) {
    const response = await this.request.get(
      `${this.path}?offset=${offset}&limit=${limit}&chat=${this.chat.getID()}`
    );

    if (response.status !== Message.httpStatusCode.OK) {
      Message
        .errorTypes
        .HTTPRequestError
        .throw(`Não foi possível buscar as mensagens do chat ${this.chat.getID()}`);
    }

    return JSON.parse(response.data).map((message: any) => {
      message.sender = new User(message.sender);
      return this.factory().build(message);
    });

  }

  toObject() {
    return {
      chat: this.chat,
      content: this.content as string,
      sender: this.sender,
      timestamp: this.timestamp as string,
    };
  }
}