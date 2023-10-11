export class RegExError extends Error {
  constructor(message) {
    this.message = message;
  }

  static throw(message = ''){
    throw new RegExError(message);
  }
}
