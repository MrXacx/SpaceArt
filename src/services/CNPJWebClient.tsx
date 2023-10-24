import { APIClient } from "../api-clients/abstracts/APIClient";

export class CNPJWebClient extends APIClient {
    /**
     * Remove todos os caracteres não aceitos
    */
    static sanitize = (code: string) => code.replaceAll(/\D/gi, '');

    /**
     *  Confere se a string possui o formato correto
     */
    static matches = (code: string) => code.match(/^\d{14}$/);

    /**
     *  Consulta dados associados ao CNPJ
     */
    fetch = async (code: string) => {
        code = CNPJWebClient.sanitize(code); // Remove caracteres especiais
        
        if (!CNPJWebClient.matches(code)) { // Executa se o código não foir válido
            CNPJWebClient.errorTypes
                .RegExError
                .throw(`Formato do CNPJ está incorreto: ${code}.`);
        }

        let response = await this.request.get(`https://brasilapi.com.br/api/cnpj/v1/${code}`);

        if (response.status !== 200) { // Executa  se o status não for de sucesso
            CNPJWebClient.errorTypes
                .HTTPRequestError
                .throw(`Não foi possível encontrar o CEP ${code}`);
        }

        let data = response.data;
        return {
            code: data.cnpj,
            companyName: data.razao_social,
            nameFantasy: data.nome_fantasia
        };
    }
};