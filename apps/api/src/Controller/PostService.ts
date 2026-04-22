import { Post } from "../Domain/Post.js";
import { PostRepository } from "../Gateway/PostRepository.js";


export class PostService {

    // singleton von https://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
    private static _instance: PostService;

    private repo: PostRepository = new PostRepository();


    public static get Instance() {
        return this._instance || (this._instance = new this());
    }


    private constructor() {
        // Keine In-Memory-Liste mehr - Posts kommen aus der DB
    }


    async getPostByID(id: string): Promise<Post | undefined> {
        console.log(`[PostService] getPostByID aufgerufen mit id=${id}`);
        return this.repo.getPostById(id);
    }


    async getAllPosts(): Promise<Post[]> {
        console.log(`[PostService] getAllPosts aufgerufen`);
        return this.repo.getAllPosts();
    }


    async getFirstPost(): Promise<Post | undefined> {
        console.log(`[PostService] getFirstPost aufgerufen`);
        const all = await this.repo.getAllPosts();
        return all[0];
    }


    // console logs per ai eingesetzt => aus debug gründen, hatte einen fehler bei dem hinzufügen
    async addPost(postToAdd: Post): Promise<Post | undefined> {
        console.log(`[PostService] addPost aufgerufen mit:`, postToAdd);

        if (postToAdd === undefined) {
            console.log(`[PostService] addPost fehlgeschlagen: postToAdd ist undefined`);
            return undefined;
        }

        try {
            const created = await this.repo.addPost(postToAdd);
            console.log(`[PostService] Post erfolgreich hinzugefügt mit ID ${created.id}`);
            return created;
        } catch (err) {
            console.error(`[PostService] addPost fehlgeschlagen:`, err);
            return undefined;
        }
    }


    async updatePost(newPost: Post): Promise<Post | undefined> {
        console.log(`[PostService] updatePost aufgerufen mit:`, newPost);

        const updated = await this.repo.updatePost(newPost);

        if (updated === undefined) {
            console.log(`[PostService] updatePost fehlgeschlagen: Post mit ID ${newPost.id} nicht gefunden`);
            return undefined;
        }

        console.log(`[PostService] Post mit ID ${newPost.id} erfolgreich aktualisiert`);
        return updated;
    }


    async deletePost(id: string): Promise<boolean> {
        console.log(`[PostService] deletePost aufgerufen mit id=${id}`);

        const deleted = await this.repo.deletePost(id);

        if (!deleted) {
            console.log(`[PostService] deletePost fehlgeschlagen: Post mit ID ${id} nicht gefunden`);
            return false;
        }

        console.log(`[PostService] Post mit ID ${id} erfolgreich gelöscht`);
        return true;
    }


    /**
     * Hilfsmethode: Legt einen Demo-Post an. Praktisch zum Testen.
     */
    async addDemoPost(): Promise<Post> {
        console.log(`[PostService] addDemoPost aufgerufen`);
        return this.repo.addDemoPost();
    }
}