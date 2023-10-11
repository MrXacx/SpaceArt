class User {
    id; index; token; type; email; password; phone; location; name;

    signIn (acessData = {
        email: this.email,
        password: this.password
    }){
        // Code here
    }
}


class Artist extends User {
    constructor() {
        super();
        this.CPF = '';
        this.art = '';
        this.wage = '';
    }

}

class UserGetModel {

    constructor(User) {
        this.id = User.id;
        this.type = User.type;
        this.token = User.token;

        this.types = User.types.map(typeUser => typeUser.type.name);
        [this.type] = this.types;
    }

}
class UserPostModel {

    constructor(User) {
        this.id = User.id;
        this.name = User.name;
        this.type = User.type;
        this.email = User.email;
        this.password = User.password;
        this.phone = User.phone;
        this.state = User.state;
        this.city = User.city;
        this.cep = User.cep;
        this.image = User.image;
        this.wage = User.wage;
        this.cpf = User.cpf;
        this.cnpj = User.cnpj;
        this.art = User.art;
        this.neighborhood = User.neighborhood;
        this.adress = User.adress;

        this.types = User.types.map(typeUser => typeUser.type.name);
        [this.type] = this.types;
    }

}
class UserPutModel {

    constructor(User) {
        this.id = User.id;
        this.type = User.type;
        this.column = User.column;
        this.info = User.info;
    }

}
class UserDelete {

    constructor(User) {
        this.id = User.id;
    }

}
class UserSignInGet {

    constructor(User) {
        this.email = User.email;
        this.password = User.password;
    }

}
class UserListGet {

    constructor(User) {
        this.id = User.id;
        this.offset = User.offset;
        this.limit = User.limit;
        this.filter = User.filter;
    }

}
class UserReportGet {

    constructor(Report) {
        this.id = report.id;
        this.reporter = User.reporter;

    }

}
class UserReportPost {

    constructor(User) {
        this.reporter = User.id;
        this.reported = User.reported;
        this.reason = report.reason;
    }

}
class UserReportList {

    constructor(User) {
        this.reporter = User.id;
        this.offset = User.offset;
        this.limit = User.limit;
    }

}