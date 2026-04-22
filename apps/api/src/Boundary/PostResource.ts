import { Router, type Request, type Response, type NextFunction } from "express";
import { Post } from "../Domain/Post.js";
import { PostService } from "../Controller/PostService.js";


export class PostResource {

    public router = Router();

    private postService = PostService.Instance;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/:id", this.getById);
        this.router.get("/:id", this.getBySecretId);
        this.router.post("/", this.addPost);
        this.router.put("/:id", this.updatePost);
        this.router.delete("/:id", this.deletePost);
    }


    // = wegen der pfeilfunktion, da nur hier this sichtabr ist
    getById = async (req: Request, res: Response, next: NextFunction) => {

        const postID: string = req.params.id as string;

        if (postID === "0") {
            return next("route");
        }

        const post = await this.postService.getPostByID(postID);

        if (!post) {
            return res.status(404).json({ error: "Post nicht gefunden" });
        }

        res.json(post);
    };

    getByTest = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Request bekommen");
        const data = await this.postService.getFirstPost();
        res.json(data);
    };

    getBySecretId = async (req: Request, res: Response, next: NextFunction) => {

        let postID: string = "";
        if (req.params.id === typeof (String)) {
            postID = req.params.id;
        }

        const post = new Post(postID, "Das ist ein geheimer Post", "Sachen mit next Functions amchen spaß", "Jan", ["Secret"]);
        res.json(post);
    };

    addPost = async (req: Request, res: Response) => {
        const body: Post = req.body;

        const resPost: Post | undefined = await this.postService.addPost(body);

        if (resPost === undefined) {
            return res.status(404).json({ error: "bad request" });
        }

        res.json(resPost);
    };

    updatePost = async (req: Request, res: Response) => {
        const body: Post = req.body;

        const resPost: Post | undefined = await this.postService.updatePost(body);

        if (resPost === undefined) {
            return res.status(404).json({ error: "bad request" });
        }

        res.json(resPost);
    };

    deletePost = async (req: Request, res: Response) => {
        const postID: string = req.params.id as string;

        const success: boolean = await this.postService.deletePost(postID);

        if (!success) {
            return res.status(404).json({ error: "Post nicht gefunden" });
        }

        res.json("erfolgreich gelöscht");
    };
}