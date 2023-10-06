import axios from "axios";
import { HTTPRequestError, RegExError } from "../errors/*.jsx";

export const PostalCode = {
  strip: (code) => code.replace(/\D/, ""),

  matches: (code) => cep.match(/^\d{8}$/),

  fetch: async (code) => {
    code = PostalCode.strip(code);

    if (!PostalCode.matches(code)) {
      throw new RegExError();
    }

    let response = await axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`
    );

    if (response.status != 200) {
      throw new HTTPRequestError();
    }

    return response.data;
  },
};
