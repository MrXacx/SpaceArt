import WebServiceClient from 'WebServiceClient.jsx';

export const CNPJWebClient = {
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
    matches: (code) => code.match(/^\d{14}$/),

    /**
     *  Consulta dados associados ao CNPJ
     *  @param string
     *  @return string[]
     */
    fetch: async (code) => {
        code = CNPJ.sanitize(code); // Remove caracteres especiais

        if (!CNPJ.matches(code)) { // Executa se o código não foir válido
            WebServiceClient.error.RegExError.throw(`Formato do CNPJ está incorreto: ${code}.`);
        }

        let response = await WebServiceClient.request.get(`https://brasilapi.com.br/api/cnpj/v1/${code}`);

        if (response.status != 200) { // Executa  se o status não for de sucesso
            WebServiceClient.error.HTTPRequestError.throw();
        }

        return response.data;
    }
};
