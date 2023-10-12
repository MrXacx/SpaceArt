import { WebServiceClient } from "./WebServiceClient";

export const PostalCodeWebClient = {

  /**
     * Remove todos os caracteres não aceitos
     * @param string
     * @return string
    */
  sanitize: (code) => code.replaceAll(/\D/gi, ""),

  /**
     *  Confere se a string possui o formato correto
     *  @param string
     *  @return boolean
     */
  matches: (code) => code.match(/^\d{8}$/),

  /**
     *  Consulta dados associados ao CEP
     *  @param string
     *  @return string[]
     */
  fetch: async (code) => {
    code = PostalCodeWebClient.sanitize(code); // Remove caracteres especiais

    if (!PostalCodeWebClient.matches(code)) { // Executa se o CEP tiver um formato inválido
      WebServiceClient.error.RegExError.throw(`Formato do CEP está inválido: ${code}.`);
    }

    let response = await WebServiceClient.request.get(`https://brasilapi.com.br/api/cep/v1/${code}`);

    if (response.status !== 200) { // Executa caso a resposta não seja de sucesso
      WebServiceClient.error.HTTPRequestError.throw();
    }

    let data = response.data;
    return {
      code: data.cep,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood
    }
  }
};
