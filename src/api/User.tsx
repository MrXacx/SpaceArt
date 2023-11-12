import { IndexedAPIClient, APIClientFactory } from "./abstracts/APIClient";
import { AccountType } from "../enums/AccountType";

/**
 * Classe de consulta de dados de usuários
 */
export class User extends IndexedAPIClient implements APIClientFactory {

  protected index: number | undefined;
  protected token: string | undefined;
  protected type: AccountType | string | undefined;
  protected email: string | undefined;
  protected password: string | undefined;
  protected phone: string | undefined;
  protected name: string | undefined;
  protected image: string | undefined;
  protected website: string | undefined;
  protected description: string | undefined;
  protected rate: number | undefined;
  protected verified: boolean | undefined;
  protected location: {
    cep: string,
    state: string,
    city: string,
    neighborhood?: string,
    address?: string,
  } | undefined; // Objeto para dados de localização

  path = "/user"; // Rote de consulta

  factory = ()  => new User();

  /**
   * Preenche todos os atributos da classe
   */
  build(user: {
    id?: string,
    token?: string,
    type?: AccountType | string,
    index?: number,
    name?: string,
    email?: string,
    password?: string,
    phone?: string,
    location?: {
      cep: string,
      state: string,
      city: string,
      neighborhood?: string,
      address?: string,
    },
    image?: string,
    website?: string,
    description?: string,
    rate?: number,
    verified?: boolean,
  }) {

    this.id = user.id;
    this.index = user.index;
    this.token = user.token;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.location = user.location;
    this.image = user.image;
    this.website = user.website;
    this.description = user.description;
    this.rate = user.rate;
    this.verified = user.verified;
    this.type = this.type ?? user.type
    return this;
  }

  /**
   * Consulta dados de identificação
   */
  async signIn(email = this.email as string, password = this.password as string) {
    let response = await this.request.get(`${this.path}/sign-in?email=${email}&password=${password}`);

    if (response.status !== User.httpStatusCode.OK) { // Executa caso o código da resposta não seja OK
      User.errorTypes
        .HTTPRequestError.throw(response.statusText); // Emite exceção
    }

    return this.factory().build(JSON.parse(response.data));

  }

  /**
   * Consulta dados gerais
   * @param boolean true para obter dados sigilosos
   * @returns object
   */
  public async fetch(isToken = false): Promise<any> {
    let response = await this.request.get(
      `${this.path}?id=${isToken ? this.token : this.id}&token=${isToken}&type=${this.type}`
    );

    if (response.status !== User.httpStatusCode.OK) {
      User.errorTypes
        .HTTPRequestError.throw(response.statusText);
    }
    
    return this.factory().build(JSON.parse(response.data)); // Intancia o retorno
  }


  async fetchForIndex(): Promise<any> {
    let response = await this.request.get(
      `${this.path}?index=${this.index}&type=${this.type}`
    );

    if (response.status !== User.httpStatusCode.OK) {
      User.errorTypes
        .HTTPRequestError.throw(response.data);
    }

    return this.factory().build(JSON.parse(response.data)); // Intancia o retorno
  }

  /**
   * Busca lista de usuários sem utilizar filtro
   */
  fetchListWithoutFilter(offset = 0, limit = 25) {
    return this.fetchList(`offset=${offset}&limit=${limit}&type=${this.type}`);
  }

  /**
   * Busca lista de usuários filtrando pelo nome completo ou parcial
   */
  fetchListFilteringName(name: string, offset = 0, limit = 25) {
    return this.fetchList(`filter=name&offset=${offset}&limit=${limit}&type=${this.type}&name=${name}`);
  }

  /**
   * Busca lista de usuários filtrando o município do usuário
   */
  fetchListFilteringLocation(state: string, city: string, offset = 0, limit = 25) {
    return this.fetchList(`filter=location&offset=${offset}&limit=${limit}&type=${this.type}&state=${state}&city=${city}`);
  }

  private async fetchList(parameters: string): Promise<this[]> {
    let response = await this.request.get(`${this.path}/list?${parameters}`);

    if (response.status !== User.httpStatusCode.OK) {
      User.errorTypes
        .HTTPRequestError.throw(response.statusText);
    }

    return JSON.parse(response.data)
      .map((item: any) => this.factory().build(item));
  }

  /**
   * Atualiza lista de atributos
   */
  async updateList(attributes: { name: string, value: string | boolean | number }[]) {

    let responses = await Promise.all(
      attributes.map((column) =>
        this.request.post(`${this.path}/update`, JSON.stringify({
          id: this.token,
          type: this.type,
          column: column.name,
          info: column.value,
        }))// atualiza dados da api
      )
    );

    return responses
      .filter(response => response.status !== User.httpStatusCode.NO_CONTENT)
      .map((response, index) =>
        new User.errorTypes
          .HTTPRequestError(
            `Não foi possível atualizar o item ${attributes[index].name} com o valor ${attributes[index].value}`
          ));
  }

  /**
   * Deleta usuário
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, JSON.stringify({ id: this.token as string }));

    if (response.status !== User.httpStatusCode.NO_CONTENT) {
      User.errorTypes
        .HTTPRequestError.throw(`Não foi possível deletar o usuário ${this.token}`);
    }
  }

  toObject() {
    return {
      id: this.id,
      index: this.index,
      token: this.token,
      type: this.type as string,
      email: this.email,
      password: this.password,
      phone: this.phone,
      name: this.name,
      image: this.image,
      website: this.website,
      description: this.description,
      rate: this.rate,
      verified: this.verified,
      location: this.location,
    }
  }
}

export class Artist extends User {
  private cpf: string | undefined;
  private art: string | undefined;
  private wage: number | undefined;
  private birthday: string | undefined;

  constructor(id: string | null = null) {
    super(id);
    this.type = 'artist';
  }

  factory = () => new Artist();

  build(artist: any) {
    super.build(artist);
    this.wage = artist.wage;
    this.cpf = artist.cpf;
    this.art = artist.art;
    this.birthday = artist.birthday;
    return this;
  }

  /**
   * Cadastra um usuário
   */
  async signUp() {

    let response = await this.request.post(this.path, JSON.stringify({
      name: this.name,
      image: this.image,
      type: this.type,
      phone: this.phone,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      cpf: this.cpf,
      cep: this.location?.cep,
      state: this.location?.state,
      city: this.location?.city,
      art: this.art,
      wage: this.wage,
    }));

    if (response.status !== User.httpStatusCode.CREATED) {
      User.errorTypes
        .HTTPRequestError.throw(response.data);
    }
  }

  toObject() {
    return {
      ...super.toObject(),
      cpf: this.cpf,
      art: this.art,
      wage: this.wage,
      birthday: this.birthday,
    }
  }
}

export class Enterprise extends User {
  private cnpj: string | undefined;
  private companyName: string | undefined;
  private section: string | undefined;

  constructor(id: string | null = null) {
    super(id);
    this.type = AccountType.enterprise;
  }

  factory = () => new Enterprise();

  build(enterprise: any) {
    super.build(enterprise);
    this.cnpj = enterprise.cnpj;
    this.companyName = enterprise.companyName;
    this.section = enterprise.section;

    return this;
  }

  /**
   * Cadastra um usuário
   */
  async signUp() {
    let response = await this.request.post(this.path, JSON.stringify({
      name: this.name,
      companyName: this.companyName,
      image: this.image,
      section: this.section,
      phone: this.phone,
      type: this.type,
      email: this.email,
      password: this.password,
      cnpj: this.cnpj,
      cep: this.location?.cep,
      state: this.location?.state,
      city: this.location?.city,
      neighborhood: this.location?.neighborhood,
      address: this.location?.address,
    }));

    if (response.status !== Enterprise.httpStatusCode.CREATED) {
      Enterprise.errorTypes
        .HTTPRequestError.throw((await response).statusText);
    }
  }

  toObject() {
    return {
      ...super.toObject(),
      cnpj: this.cnpj,
      companyName: this.companyName,
      section: this.section,
    }
  }

}
