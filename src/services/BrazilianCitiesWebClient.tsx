import { APIClient } from "../api/abstracts/APIClient";
import { BrazilianState } from "../enums/BrazilianState";

export class BrazilianCitiesWebClient extends APIClient {
  /**
   *  Fetches data associated with the postal code (CEP).
   */
  fetch = async (state: BrazilianState) => {
    const response = await this.request.get(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov`
    );

    if (response.status !== 200) {
      // Executes if the response is not successful
      BrazilianCitiesWebClient.errorTypes.HTTPRequestError.throw();
    }

    return JSON.parse(response.data).map((city: any) => city.nome);
  };
}
