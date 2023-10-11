export class HTTPRequestError extends Error {
  constructor(message) {
    this.message = message;
  }

  static throw(message = ''){
    throw new HTTPRequestError(message);
  }
}
