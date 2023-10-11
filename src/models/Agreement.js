class Agreement extends User{
    constructor() {
        super();
        this.id = '';
    }
    
}

class AgreementGet{

        constructor (Agreement){
            this.id = Agreement.id;           
        }
    
}
class AgreementPost{

    constructor (Agreement){
        this.hirer = User.id;
        this.hired = User.id;
        this.art = User.art;
        this.price = Agreement.price;
        this.date = Agreement.date;
        this.time = Agreement.time;
    }

}
class AgreementPut{

    constructor (Agreement){
        this.id = Agreement.id;
        this.column = Agreement.column;
        this.info = Agreement.info;
    }

}
class AgreementDelete{

    constructor (Agreement){
        this.id = Agreement.id;
    }

}
class AgreementListGet{

    constructor (Agreement){
        this.id = Agreement.id;
        this.offset = Agreement.offset;
        this.limit = Agreement.limit;
    }

}
class AgreementRateGet{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
       
    }

}
class AgreementRatePost{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
        this.rate = Rate.value;
    }

}
class AgreementRatePut{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
        this.column = Rate.column;
        this.info= Rate.info;
    }

}
class AgreementRateDelete{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.author = User.id;
    }

}
class AgreementRateListGet{

    constructor (Agreement){
        this.agreement = Agreement.id;
        this.offset = Rate.offset;
        this.limit = Rate.limit;
    }

}