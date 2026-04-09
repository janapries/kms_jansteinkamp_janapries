import { Post } from "../Domain/Post.js";

export class PostService {
    postList: Post[] = [];


    constructor(){
        this.postList = [
            new Post("1", "Ich hab mich exmatrikuliert", "Das Leben ist endlich gut", ["Freiheit", "Leben"]),
            new Post("2", "Neues Projekt gestartet", "Wir bauen eine REST API mit Express", ["TypeScript", "Express", "API"]),
            new Post("3", "Warum ich TypeScript liebe", "Typsicherheit rettet Leben und Nerven", ["TypeScript", "Dev"]),
            new Post("4", "Nodemon vs tsx", "Ein Vergleich der beiden Tools für die Entwicklung", ["Tools", "Node"]),
            new Post("5", "Middleware verstanden", "Endlich macht next() Sinn für mich", ["Express", "Lernen"]),
        ];
    }

    getPostByID(id: string): Post | undefined {
        return this.postList.find(post => post.id === id);
    }

    getAllPosts(){
        return this.postList;
    }

    // console logs per ai eingesetzt
    addPost(postToAdd: Post): Post | undefined {
        console.log(`[PostService] addPost aufgerufen mit:`, postToAdd);

        if (postToAdd === undefined) {
            console.log(`[PostService] addPost fehlgeschlagen: postToAdd ist undefined`);
            return undefined;
        }

        if (this.postList.find(post => post.id === postToAdd.id)) {
            console.log(`[PostService] addPost fehlgeschlagen: Post mit ID ${postToAdd.id} existiert bereits`);
            return undefined;
        }

        this.postList.push(postToAdd);
        console.log(`[PostService] Post erfolgreich hinzugefügt. Liste hat jetzt ${this.postList.length} Einträge`);

        return postToAdd;
    }

    updatePost(){}

    deletePost(){}
}