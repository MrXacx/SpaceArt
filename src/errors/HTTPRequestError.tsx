<<<<<<< HEAD
export class HTTPRequestError extends Error {
  constructor(message:string) {
    super();
    this.message = message;
  }

  static throw(message = ''){
    throw new HTTPRequestError(message);
  }
}
=======
export class HTTPRequestError extends Error {
  constructor(message:string) {
    super();
    this.message = message;
  }

  static throw(message = ''){
    throw new HTTPRequestError(message);
  }
}
>>>>>>> 33f828e (feed typescript)
