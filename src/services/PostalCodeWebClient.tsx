

import { APIClient } from "../api/abstracts/APIClient";


export class PostalCodeWebClient extends APIClient {

  /**
     * Remove todos os caracteres não aceitos
    */
  static sanitize = (code: string) => code.replaceAll(/\D/gi, '');

  /**
     *  Confere se a string possui o formato correto
     */
  static matches = (code: string) => code.match(/^\d{8}$/);

  /**
     *  Consulta dados associados ao CEP
     */
  fetch = async (code: string) => {


    code = PostalCodeWebClient.sanitize(code); // Remove caracteres especiais

    if (!PostalCodeWebClient.matches(code)) { // Executa se o CEP tiver um formato inválido
      PostalCodeWebClient
        .errorTypes
        .RegExpError
        .throw(`Formato do CEP está inválido: ${code}.`);
    }


    const response = await this.request.get(`https://brasilapi.com.br/api/cep/v1/${code}`);

    if (response.status !== 200) { // Executa caso a resposta não seja de sucesso
      PostalCodeWebClient

        .errorTypes
        .HTTPRequestError
        .throw();

    }

    const data = JSON.parse(response.data);
    return {
      code: data.cep,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood
    }
  }
};


