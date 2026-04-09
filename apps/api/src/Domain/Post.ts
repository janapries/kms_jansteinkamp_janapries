export class Post {
    
    constructor(id: number, title: string, desription: string, tags: string[]){
        this.id = id
        this.title = title;
        this.desciption = desription;
        this.tags = tags;
    }


    
    id: number;
    title: string;
    desciption: string;
    tags: string[];


}
