export class Post {
    
    constructor(id: string, title: string, desription: string, author: string, tags: string[]){
        this.id = id
        this.title = title;
        this.desciption = desription;
        this.author = author;
        this.tags = tags;
    }


    
    id: string;
    title: string;
    desciption: string;
    author: string;
    tags: string[];




}
