export class RegExError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  static throw(message = "") {
    throw new RegExError(message);
  }
}
