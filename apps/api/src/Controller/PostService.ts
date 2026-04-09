import { Post } from "../Domain/Post.js";

export class PostService {
    postList: Post[] = [];


    constructor(){
        this.postList = [
            new Post(1, "Ich hab mich exmatrikuliert", "Das Leben ist endlich gut", ["Freiheit", "Leben"]),
            new Post(2, "Neues Projekt gestartet", "Wir bauen eine REST API mit Express", ["TypeScript", "Express", "API"]),
            new Post(3, "Warum ich TypeScript liebe", "Typsicherheit rettet Leben und Nerven", ["TypeScript", "Dev"]),
            new Post(4, "Nodemon vs tsx", "Ein Vergleich der beiden Tools für die Entwicklung", ["Tools", "Node"]),
            new Post(5, "Middleware verstanden", "Endlich macht next() Sinn für mich", ["Express", "Lernen"]),
        ];
    }

    getPostByID(id: number): Post | undefined {
        return this.postList.find(post => post.id === id);
    }
}