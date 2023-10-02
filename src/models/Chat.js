class Chat extends User{
    constructor() {
        super();
        this.id = '';
    }
    
}

class ChatGet{

        constructor (Chat){
            this.id = Chat.id;           
        }
    
}
class ChatPost{

    constructor (Chat){
        this.artist = User.id;
        this.enterprise = User.id;
    }

}
class ChatListGet{

    constructor (Chat){
        this.user = User.id;
        this.offset = Chat.offset;
        this.limit = Chat.limit;
    }

}
class ChatMessageGet{

    constructor (Chat){
        this.id = Chat.id;
        this.sender = User.id;
        this.timestamp = Message.timestamp;
    }

}
class ChatMessagePost{

    constructor (Chat){
        this.id = Chat.id;
        this.sender = User.id;
    }

}
