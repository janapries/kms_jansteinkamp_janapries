import { Router, type Request, type Response, type NextFunction } from "express";
import { Post } from "../Domain/Post.js";
import { PostService } from "../Controller/PostService.js";


export class PostResource {

    public router = Router();

    postService: PostService = new PostService;

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get("/:id", this.getById);
        this.router.get("/:id", this.getBySecretId);
    }   
       

    getById = async (req: Request, res: Response, next: NextFunction) => {

        const post = this.postService.getPostByID(Number(req.params.id));

        if (req.params.id === "0"){
            return next("route")
        }

        if (!post) {
            return res.status(404).json({ error: "Post nicht gefunden" });
        }

        res.json(post);
    };

    getBySecretId = async (req: Request, res: Response, next: NextFunction) => {

        const post = new Post(req.params.id as unknown as number, "Das ist ein geheimer Post", "Sachen mit next Functions amchen spaß", ["Secret"]);
        res.json(post); 
    };
}