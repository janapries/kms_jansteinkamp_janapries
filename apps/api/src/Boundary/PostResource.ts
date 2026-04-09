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
        this.router.post("/", this.addPost);
    }   
       

    // = wegen der pfeilfunktion, da nur hier this sichtabr ist
    getById = async (req: Request, res: Response, next: NextFunction) => {

        var postID: string = "";
        if (req.params.id === typeof(String)){
            postID = req.params.id;
        }

        const post = this.postService.getPostByID(postID);

        if (req.params.id === "0"){
            return next("route")
        }

        if (!post) {
            return res.status(404).json({ error: "Post nicht gefunden" });
        }

        res.json(post);
    };

    getBySecretId = async (req: Request, res: Response, next: NextFunction) => {

        var postID: string = "";
        if (req.params.id === typeof(String)){
            postID = req.params.id;
        }

        const post = new Post(postID, "Das ist ein geheimer Post", "Sachen mit next Functions amchen spaß", ["Secret"]);
        res.json(post); 
    };

    addPost = async (req: Request, res: Response) => {
        const body: Post = req.body;

        const resPost: Post | undefined = this.postService.addPost(body);

        if (resPost === undefined){
            return res.status(404).json({error: "bad request"})
        }
        

        res.json(resPost);

    }
}