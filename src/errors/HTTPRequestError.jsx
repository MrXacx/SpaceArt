export class HTTPRequestError extends Error {
  constructor(message) {
    this.message = message;
  }
}
