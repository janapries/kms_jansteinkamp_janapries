import { Router, type NextFunction, type Request, type Response } from "express";
import { AuthorService } from "../Controller/AuthorService.js";
import { Author } from "../Domain/Author.js";
import jwt from "jsonwebtoken";


export class AuthorResource {

    public router = Router();

    private authorService = AuthorService.Instance;

    //private jwt =require('jsonwebtoken'); => das muss per @types oder? habe mich an der npm doc orientiert

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.get("/:id", this.getById);
    }

    register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, Email und Passwort sind erforderlich" });
        }

        const author = new Author(undefined!, name, email, password, []);

        const created = await this.authorService.addAuthor(author);

        if (!created) {
            return res.status(409).json({ error: "Registrierung fehlgeschlagen" });
        }
        const token = jwt.sign({ email: created.email, uid: created.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return res.status(201).json({ token, author: created });
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email und Passwort sind erforderlich" });
        }

        const author = await this.authorService.loginAuthor(email, password);

        if (!author) {
            return res.status(401).json({ error: "Ungültige Anmeldedaten" });
        }

        const token = jwt.sign(
            { email: author.email, uid: author.id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token });
    };

    logout = async (req: Request, res: Response) => {

    }

    getById = async (req: Request, res: Response, next: NextFunction) => {

        const postID = Number(req.params.id);

        const post = await this.authorService.getAuthor(postID);

        if (!post) {
            return res.status(404).json({ error: "Post nicht gefunden" });
        }

        res.json(post);
    };
}