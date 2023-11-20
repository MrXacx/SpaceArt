export class RegExpError extends Error {
  static throw(message = "") {
    throw new RegExpError(message);
  }
}
