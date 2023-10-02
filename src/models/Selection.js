class Selection extends User{
    constructor() {
        super();
        this.id = '';
    }
    
}

class SelectionGet{

        constructor (Selection){
            this.id = Selection.id;           
        }
    
}
class SelectionPost{

    constructor (Selection){
        this.owner = User.id;
        this.art = Selection.art;
        this.price = Selection.price;
        this.date = Selection.date;
        this.time = Selection.time;
    }

}
class SelectionPut{

    constructor (Selection){
        this.id = Selection.id;
        this.column = Selection.column;
        this.info = Selection.info;
    }

}
class SelectionDelete{

    constructor (Selection){
        this.id = Selection.id;
    }

}
class SelectionListGet{

    constructor (Selection){
        this.id = User.id;
        this.offset = Selection.offset;
        this.limit = Selection.limit;
    }

}
class SelectionApplicationGet{

    constructor (Selection){
        this.selection = Selection.id;
        this.artist = User.id;
       
    }

}
class SelectionApplicationPost{

    constructor (Selection){
        this.selection = Selection.id;
        this.artist = User.id;
       
    }
}
class SelectionApplicationPut{

    constructor (Selection){
        this.selection = Selection.id;
        this.artist = User.id;
        this.column = Selection.column;
        this.info = Selection.info;
       
    }
}
class SelectionApplicationDelete{

    constructor (Selection){
        this.selection = Selection.id;
        this.artist = User.id;
       
    }

}
class SelectionApplicationListGet{

    constructor (Selection){
        this.selection = Selection.id;
     
    }

}