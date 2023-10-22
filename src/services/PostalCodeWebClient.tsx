import { APIClient } from "../api-clients/abstracts/APIClient";

export class PostalCodeWebClient extends APIClient {

  /**
     * Remove todos os caracteres não aceitos
    */
  static sanitize = (code: string) => code.replaceAll(/\D/gi, '');

  /**
     *  Confere se a string possui o formato correto
     */
  static matches = (code: string) => code.match(/^\d{5}-\d{3}$/);

  /**
     *  Consulta dados associados ao CEP
     */
  fetch = async (code: string) => {
    
    if (!PostalCodeWebClient.matches(code)) { // Executa se o CEP tiver um formato inválido
      PostalCodeWebClient
      .errorTypes
      .RegExError
      .throw(`Formato do CEP está inválido: ${code}.`);
    }
    
    code = PostalCodeWebClient.sanitize(code); // Remove caracteres especiais
    const response = await this.request.get(`https://brasilapi.com.br/api/cep/v1/${code}`);

    if (response.status !== 200) { // Executa caso a resposta não seja de sucesso
      PostalCodeWebClient
      .errorTypes
      .HTTPRequestError
      .throw();
    }

    const data = response.data;
    return {
      code: data.cep,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood
    }
  }
};
