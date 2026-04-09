export class Post {
    
    constructor(id: string, title: string, desription: string, tags: string[]){
        this.id = id
        this.title = title;
        this.desciption = desription;
        this.tags = tags;
    }


    
    id: string;
    title: string;
    desciption: string;
    tags: string[];




}
