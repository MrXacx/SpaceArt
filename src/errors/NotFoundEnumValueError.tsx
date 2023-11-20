export class NotFoundEnumValueError extends Error {
  static throw(message?: string): never {
    throw new NotFoundEnumValueError(message);
  }
}
