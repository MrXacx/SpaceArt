import { WebServiceClient } from "../services/WebServiceClient";
import { APISpaceArtClient } from "./APISpaceArtClient";

const { error } = WebServiceClient;

export class Message extends APISpaceArtClient {
    private content: string | undefined;
    private sender: string | undefined;
    private timestamp: string | undefined;
  
    private path = "/chat/message";
  
    factory(data: { content: string; sender: string; timestamp: string }) {
      this.content = data.content;
      this.sender = data.sender;
      this.timestamp = data.timestamp;
    }
  
    async create(chat: string, sender: string, content: string) {
      let response = await this.request.post(this.path, {
        chat,
        sender,
        content,
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
    async fetchList(chat: string, offset = 0, limit = 10) {
      let response = await this.request.get(
        `${this.path}?offset=${offset}&limit=${limit}&chat=${chat}`
      );
  
      if (response.status !== this.httpStatusCode.OK) {
        error.HTTPRequestError.throw(
          `Não foi possível buscar as mensagens do chat ${chat}`
        );
      }
  
      return response.data.map((message: any) => new Message().factory(message));
    }
  
    toObject() {
      return {
        content: this.content as string,
        sender: this.sender as string,
        timestamp: this.timestamp as string,
      };
    }
  }