import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";
import { Chat } from "./Chat";
import { User } from "./User";

const { error } = WebServiceClient;

export class Message extends APISpaceArtClient {
    private content: string | undefined;
    private sender: User | undefined;
    private timestamp: string | undefined;
  
    private path = "/chat/message";

    constructor(private readonly chat: Chat){super()}

    factory(data: { content: string; sender: User; timestamp: string | undefined }) {
      this.content = data.content;
      this.sender = data.sender;
      this.timestamp = data.timestamp;

      return this;
    }
  
    async create() {
      let response = await this.request.post(this.path, {
        chat: this.chat,
        sender: this.sender,
        content: this.content,
      });
  
      if (response.status !== this.httpStatusCode.CREATED) {
        error.HTTPRequestError.throw(
          "Não foi possível criar uma mensagem no banco"
        );
      }
    }
  
    /**
     * Busca uma lista de mensagens de uma conversa
     *
     * @param string id do chat
     * @param int offset
     * @param int limit
     * @returns Message[]
     */
    async fetchList( offset = 0, limit = 10) {
      let response = await this.request.get(
        `${this.path}?offset=${offset}&limit=${limit}&chat=${this.chat}`
      );
  
      if (response.status !== this.httpStatusCode.OK) {
        error.HTTPRequestError.throw(
          `Não foi possível buscar as mensagens do chat ${this.chat}`
        );
      }
  
      return response.data.map((message: any) => new Message(this.chat).factory(message));
    }
  
    toObject() {
      return {
        content: this.content as string,
        sender: this.sender?.id,
        timestamp: this.timestamp as string,
      };
    }
  }