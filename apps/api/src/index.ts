import express from "express"

const app = express();

app.use(express.json());

app.get("/", async (req, reply) => {
    reply.json({status: "alles supi"});
});

app.listen({port: 3000}, () => {
console.log("Server running");
});