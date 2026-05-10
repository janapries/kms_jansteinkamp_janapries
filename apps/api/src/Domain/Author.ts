import type { Post } from "./Post.js";

export class Author{
    id: number;
    name: string;
    email: string;
    password: string;
    posts: Post[];

    constructor(id: number, name: string, email: string, password: string, posts: Post[]){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;  
        this.posts = posts;      
    }
}