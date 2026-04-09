import { Router, type Request, type Response, type NextFunction } from "express";
import { Post } from "../Domain/Post.js";
import { PostService } from "../Controller/PostService.js";

export class PostsResource{
    public router = Router();

    private postService = PostService.Instance;

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get("/", this.getAllPosts);
    }   

    getAllPosts = async(req: Request, res: Response) => {
        res.json(this.postService.getAllPosts())
    };
      
}