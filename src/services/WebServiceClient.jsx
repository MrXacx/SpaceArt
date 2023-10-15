// Importa a biblioteca Axios
import axios from "axios";
import { HTTPRequestError } from '../errors/HTTPRequestError'; // Importa classes de erro
import { RegExError } from '../errors/RegExError'; // Importa classes de erro

export const WebServiceClient = {
  request: axios,
  error: {
    HTTPRequestError: HTTPRequestError,
    RegExError: RegExError
  },
  status: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400
  }
}