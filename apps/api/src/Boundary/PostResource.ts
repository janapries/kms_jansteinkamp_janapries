import { Router, type Request, type Response, type NextFunction } from "express";
import { Post } from "../Domain/Post.js";


export class PostResource {

    public router = Router();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get("/:id", this.getById);
        this.router.get("/:id", this.getBySecretId);
    }   
       

    getById = async (req: Request, res: Response, next: NextFunction) => {
        if (req.params.id === "0"){
            return next("route")
        }
        const post = new Post(1, "Ich hab mich exmatrikuliert...", "Das Leben ist endlich gut", ["Freiheit", "Wirklich"]);
        res.json(post); 
    };

    getBySecretId = async (req: Request, res: Response, next: NextFunction) => {

        const post = new Post(1, "Das ist ein geheimer Post", "Sachen mit next Functions amchen spaß", ["Secret"]);
        res.json(post); 
    };
}