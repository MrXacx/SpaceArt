import { IndexedAPIClient } from "./abstracts/APIClient";

/**
 * Classe de consulta de dados de usuários
 */
export class User extends IndexedAPIClient {

  protected index: number | undefined;
  protected token: string | undefined;
  protected type: string | undefined;
  protected email: string | undefined;
  protected password: string | undefined;
  protected phone: string | undefined;
  protected name: string | undefined;
  protected image: string | undefined;
  protected website: string | undefined;
  protected description: string | undefined;
  protected rate: number | undefined;
  protected verified: boolean | undefined;

  protected location: any; // Objeto para dados de localização

  path = "/user"; // Rote de consulta

  /**
   * Preenche todos os atributos da classe
   */
  factory(user: {
    id?: string,
    token?: string,
    type?: string,
    index?: number,
    name?: string,
    email: string,
    password: string,
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

    const userData = response.data;


    this.id = userData.id as string
    this.token = userData.token as string
    this.index = userData.index as number
    this.type = userData.type as string

  }

  /**
   * Consulta dados gerais
   * @param boolean true para obter dados sigilosos
   * @returns object
   */
  protected async fetch(isToken = false) {
    let response = await this.request.get(
      `${this.path}?id=${isToken ? this.token : this.id}&token=${isToken}&type=${this.type}`
    );

    if (response.status !== User.httpStatusCode.OK) {
      User.errorTypes
        .HTTPRequestError.throw(response.statusText);
    }

    return response.data;
  }

  /**
   * Busca lista de usuários sem utilizar filtro
   */
  protected fetchListNoFilter(offset = 0, limit = 25) {
    return this.fetchList(`offset=${offset}&limit=${limit}&type=${this.type}`);
  }

  /**
   * Busca lista de usuários filtrando pelo nome completo ou parcial
   */
  protected fetchListFilteringName(name: string, offset = 0, limit = 25) {
    return this.fetchList(`offset=${offset}&limit=${limit}&type=${this.type}&name=${name}`);
  }

  /**
   * Busca lista de usuários filtrando o município do usuário
   */
  protected fetchListFilteringLocation(state: string, city: string, offset = 0, limit = 25) {
    return this.fetchList(`offset=${offset}&limit=${limit}&type=${this.type}&state=${state}&city=${city}`);
  }

  private async fetchList(parameters: string): Promise<any[]> {
    let response = await this.request.get(`${this.path}/list?${parameters}`);

    if (response.status !== User.httpStatusCode.OK) {
      User.errorTypes
        .HTTPRequestError.throw(response.statusText);
    }

    return response.data;
  }

  /**
   * Atualiza lista de atributos
   */
  async updateList(attributes: { name: string, value: string | boolean | number }[]) {

    let responses = await Promise.all(
      attributes.map((column) =>
        this.request.post(`${this.path}/update`, {
          id: this.token,
          type: this.type,
          column: column.name,
          info: column.value,
        })// atualiza dados da api
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
   * @param string token
   */
  async delete() {
    let response = await this.request.post(`${this.path}/delete`, { id: this.token as string });

    if (response.status !== User.httpStatusCode.NO_CONTENT) {
      User.errorTypes
        .HTTPRequestError.throw(`Não foi possível deletar o usuário ${this.token}`);
    }
  }
}

export class Artist extends User {
  private cpf: string | undefined;
  private art: string | undefined;
  private wage: string | undefined;
  private birthday: string | undefined;

  constructor(id: string | null = null) {
    super(id);
    this.type = "artist";
  }

  factory(artist: any) {
    super.factory(artist);
    this.wage = artist.wage;
    this.cpf = artist.cpf;
    this.art = artist.art;

    return this;
  }

  /**
   * Cadastra um usuário
   */
  async signUp() {
    let response = await this.request.post(this.path, {
      name: this.name,
      image: this.image,
      type: this.type,
      phone: this.phone,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
      cpf: this.cpf,
      cep: this.location.cep,
      state: this.location.state,
      city: this.location.city,
      art: this.art,
      wage: this.wage,
    });

    if (response.status !== User.httpStatusCode.CREATED) {
      User.errorTypes
        .HTTPRequestError.throw((await response).statusText);
    }
  }

  async fetch(token = false): Promise<Artist> {
    return new Artist().factory(super.fetch(token)); // Intancia o retorno
  }

  async fetchListNoFilter(offset = 0, limit = 25): Promise<Artist[]> {
    return super.fetchListNoFilter(offset, limit).then(
      list => list.map(new Artist().factory)
    );
  }

  async fetchListFilteringName(name: string, offset = 0, limit = 25): Promise<Artist[]> {
    return super.fetchListFilteringName(name, offset, limit).then(
      list => list.map(new Artist().factory)
    )
  }

  async fetchListFilteringLocation(state: string, city: string, offset = 0, limit = 25): Promise<Artist[]> {
    return super.fetchListFilteringLocation(state, city, offset, limit).then(
      list => list.map(new Artist().factory)
    );
  }


}

export class Enterprise extends User {
  private cnpj: string | undefined;
  private companyName: string | undefined;
  private section: string | undefined;

  constructor(id: string | null = null) {
    super(id);
    this.type = "enterprise";
  }

  factory(enterprise: any) {
    super.factory(enterprise);
    this.cnpj = enterprise.cnpj;
    this.companyName = enterprise.companyName;
    this.section = enterprise.section;

    return this;
  }

  /**
   * Cadastra um usuário
   */
  async signUp() {
    let response = await this.request.post(this.path, {
      name: this.name,
      companyName: this.companyName,
      image: this.image,
      section: this.section,
      phone: this.phone,
      type: this.type,
      email: this.email,
      password: this.password,
      cnpj: this.cnpj,
      cep: this.location.cep,
      state: this.location.state,
      city: this.location.city,
      neighborhood: this.location.neighborhood,
      address: this.location.address,
    });

    if (response.status !== Enterprise.httpStatusCode.CREATED) {
      Enterprise.errorTypes
        .HTTPRequestError.throw((await response).statusText);
    }
  }

  async fetch(token = false) {
    return new Enterprise().factory(super.fetch(token)); // Intancia o retorno
  }

  async fetchListNoFilter(offset = 0, limit = 25): Promise<Enterprise[]> {
    return super.fetchListNoFilter(offset, limit).then(
      list => list.map(new Enterprise().factory)
    );
  }

  async fetchListFilteringName(name: string, offset = 0, limit = 25): Promise<Enterprise[]> {
    return super.fetchListFilteringName(name, offset, limit).then(
      list => list.map(new Enterprise().factory)
    )
  }

  async fetchListFilteringLocation(state: string, city: string, offset = 0, limit = 25): Promise<Enterprise[]> {
    return super.fetchListFilteringLocation(state, city, offset, limit).then(
      list => list.map(new Enterprise().factory)
    );
  }
}

