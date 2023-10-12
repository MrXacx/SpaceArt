// Importa a biblioteca Axios
import axios from "axios";
import { HTTPRequestError } from '../errors/HTTPRequestError'; // Importa classes de erro
import { RegExError } from '../errors/RegExError'; // Importa classes de erro

export const WebServiceClient = {
  request: axios,
  error: {
    HTTPRequestError: HTTPRequestError,
    RegExError: RegExError
  }
}