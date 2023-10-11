import WebServiceClient from "WebServiceClient.jsx";

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
    code: PostalCode.sanitize(code); // Remove caracteres especiais

    if (!PostalCode.matches(code)) { // Executa se o CEP tiver um formato inválido
      WebServiceClient.error.RegExError.throw(`Formato do CEP está inválido: ${code}.`);
    }

    let response = await WebServiceClient.query.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);

    if (response.status != 200) { // Executa caso a resposta não seja de sucesso
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
