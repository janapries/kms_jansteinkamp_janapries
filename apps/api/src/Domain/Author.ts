import type { Post } from "./Post.js";

export class Author{


    constructor(id: string, name: string, email: string, password: string, posts: Post[]){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;  
        this.posts = posts;      
    }


    
    id: string;
    name: string;
    email: string;
    password: string;

    posts: Post[];





}