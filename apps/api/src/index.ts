import express from "express"
import { PostResource } from "./Boundary/PostResource.js";

const app = express();

app.use(express.json());

const postResource: PostResource = new PostResource

// Middleware

    // logging 

    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    // auth
    app.use((req, res, next) =>{
        console.log("User ist authenticated");
        next();
    })


// Routen
app.use("/post", postResource.router)

app.listen({port: 3000}, () => {
console.log("Server running");
});