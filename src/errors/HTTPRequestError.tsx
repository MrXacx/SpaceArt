export class HTTPRequestError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  static throw(message = "") {
    throw new HTTPRequestError(message);
  }
}
