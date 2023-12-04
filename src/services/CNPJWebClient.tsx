import { APIClient } from "../api/abstracts/APIClient";

export class CNPJWebClient extends APIClient {
  /**
   * Remove all non-accepted characters
   */
  static sanitize = (code: string) => code.replaceAll(/\D/gi, "");

  /**
   *  Checks if the string has the correct format
   */
  static matches = (code: string) => code.match(/^\d{14}$/);

  /**
   *  Fetches data associated with the CNPJ
   */
  fetch = async (code: string) => {
    code = CNPJWebClient.sanitize(code); // Remove special characters

    if (!CNPJWebClient.matches(code)) {
      // Executes if the code is not valid
      CNPJWebClient.errorTypes.RegExpError.throw(
        `Incorrect CNPJ format: ${code}.`
      );
    }

    let response = await this.request.get(
      `https://brasilapi.com.br/api/cnpj/v1/${code}`
    );

    if (response.status !== CNPJWebClient.httpStatusCode.OK) {
      // Executa  se o status não for de sucesso
      CNPJWebClient.errorTypes.HTTPRequestError.throw(
        `Could not find CNPJ ${code}`
      );
    }

    let data = JSON.parse(response.data);
    return {
      code: data.cnpj,
      companyName: data.razao_social,
      nameFantasy: data.nome_fantasia,
    };
  };
}
