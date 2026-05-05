import express from "express"
import jwt from "jsonwebtoken"
import { PostResource } from "./Boundary/PostResource.js";
import { PostsResource } from "./Boundary/PostsResource.js";
import { AuthorResource } from "./Boundary/AuthorResource.js";

const app = express();

app.use(express.json());

const postResource: PostResource = new PostResource
const postsResource: PostsResource = new PostsResource
const authorResource: AuthorResource = new AuthorResource

// Middleware

    // logging 

    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    // auth
    const authMiddleware = (req: any, res: any, next: any) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Kein Token angegeben" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            console.log(decoded);
            req.user = decoded;
            next();
        } catch {
            return res.status(403).json({ error: "Token ungültig oder abgelaufen" });
        }
    };


// Routen
app.use("/post", authMiddleware, postResource.router)
app.use("/posts", authMiddleware, postsResource.router)
app.use("/user", authorResource.router)

app.listen({port: 3000}, () => {
console.log("Server running");
});