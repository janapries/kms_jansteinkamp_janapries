import { Post } from "../Domain/Post.js";

export class PostService {
    postList: Post[] = [];

    // singleton von https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
    private static _instance: PostService;


    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }


    constructor(){
        this.postList = [
            new Post("1", "Ich hab mich exmatrikuliert", "Das Leben ist endlich gut","Jan",  ["Freiheit", "Leben"]),
            new Post("2", "Neues Projekt gestartet", "Wir bauen eine REST API mit Express","Jan", ["TypeScript", "Express", "API"]),
            new Post("3", "Warum ich TypeScript liebe", "Typsicherheit rettet Leben und Nerven","Jan", ["TypeScript", "Dev"]),
            new Post("4", "Nodemon vs tsx", "Ein Vergleich der beiden Tools für die Entwicklung","Jan", ["Tools", "Node"]),
            new Post("5", "Middleware verstanden", "Endlich macht next() Sinn für mich","Jan", ["Express", "Lernen"]),
        ];
    }

    getPostByID(id: string): Post | undefined {
        return this.postList.find(post => post.id == id);
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

    updatePost(newPost: Post): Post | undefined {
        const index = this.postList.findIndex(post => post.id === newPost.id);

        if (index === -1) {
            console.log(`[PostService] updatePost fehlgeschlagen: Post mit ID ${newPost.id} nicht gefunden`);
            return undefined;
        }

        this.postList[index] = newPost;
        console.log(`[PostService] Post mit ID ${newPost.id} erfolgreich aktualisiert`);
        return this.postList[index];
    }

    deletePost(id: string): Post | undefined{
        let postID: number = this.postList.findIndex(post => post.id === id);

        // Source - https://stackoverflow.com/a/15295806
        // Posted by blorkfish, modified by community. See post 'Timeline' for change history
        // Retrieved 2026-04-09, License - CC BY-SA 4.0
        const index = this.postList.indexOf(this.postList[postID] as any, 0);
        if (index > -1) {
        this.postList.splice(index, 1);
        }


        console.log(`${postID} gefunden und gesucht habe ich mit ${id}`);

        return undefined;
        
    }
}