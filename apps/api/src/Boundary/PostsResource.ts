import { Router, type Request, type Response, type NextFunction } from "express";
import { PostService } from "../Controller/PostService.js";

export class PostsResource {
    public router = Router();

    private postService = PostService.Instance;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.getAllPosts);
    }

    getAllPosts = async (req: Request, res: Response) => {
        const posts = await this.postService.getAllPosts();
        res.json(posts || []);
    };

}