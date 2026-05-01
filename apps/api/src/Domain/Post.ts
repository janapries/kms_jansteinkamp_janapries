import type { Author } from "./Author.js";


export class Post {
    
    constructor(id: string, title: string, description: string, author: Author | undefined, authorId: number, tags: string[]){
        this.id = id
        this.title = title;
        this.description = description;
        this.author = author;
        this.authorId = authorId;
        this.tags = tags;
    }


    
    id: string;
    title: string;
    description: string;
    author: Author | undefined;
    authorId: number;
    tags: string[];




}


