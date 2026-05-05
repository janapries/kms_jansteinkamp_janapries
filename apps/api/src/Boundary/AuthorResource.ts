import { Router, type Request, type Response } from "express";
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

        return res.status(201).json(created);
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
            { email: author.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token });
    };
}