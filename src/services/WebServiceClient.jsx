// Importa a biblioteca Axios
import axios from "axios";
import {HTTPRequestError, RegExError} from '../errors/*.jsx'; // Importa classes de erro

export const WebServiceClient = {
  request: axios,
  error: {
    HTTPRequestError: HTTPRequestError,
    RegExError: RegExError
  }
}