import { APIClient } from "../api/abstracts/APIClient";

export class PostalCodeWebClient extends APIClient {
  /**
   * Remove all non-accepted characters
   */
  static sanitize = (code: string) => code.replaceAll(/\D/gi, "");

  /**
   *  Checks if the string has the correct format
   */
  static matches = (code: string) => code.match(/^\d{8}$/);

  /**
   *  Fetches data associated with the postal code (CEP)
   */
  fetch = async (code: string) => {
    code = PostalCodeWebClient.sanitize(code); // Remove special characters

    if (!PostalCodeWebClient.matches(code)) {
      // Executes if the CEP has an invalid format
      PostalCodeWebClient.errorTypes.RegExpError.throw(
        `Invalid CEP format: ${code}.`
      );
    }

    const response = await this.request.get(
      `https://brasilapi.com.br/api/cep/v1/${code}`
    );

    if (response.status !== 200) {
      // Executes if the response is not successful
      PostalCodeWebClient.errorTypes.HTTPRequestError.throw();
    }

    const data = JSON.parse(response.data);
    return {
      code: data.cep,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
    };
  };
}
