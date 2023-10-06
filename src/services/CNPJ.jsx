// Importa a biblioteca Axios
import axios from "axios";
import {HTTPRequestError, RegExError} from '../errors/*.jsx'; // Importa classes de erro

const CNPJ = {
  strip: (code) => code.replace(/\D/gi, ""), // Remove todos os caracteres não numéricos

  matches: (code) => cnpj.match(/^\d{14}$/), // 

  fetch: (code) => {
    code = CNPJ.strip(code);

    if(CNPJ.matches(code)){
      throw new RegExError();
    }

    const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${code}`);
    
    if (response.status != 200) {
      throw new HTTPRequestError();
    }
  
    return response.data;
  }
}



