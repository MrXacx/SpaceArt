import { Axios } from "axios";
import { WebServiceClient } from "../services/WebServiceClient";

export abstract class APISpaceArtClient {
    protected request = new Axios({
        baseURL: 'https://service-spaceart.000webhostapp.com'
    });

    protected httpStatusCode = WebServiceClient.status;
}