import { prisma } from "@repo/db/lib/prisma";
import { Post } from "../Domain/Post.js";
import type { AuthorCatalog } from "../Domain/AuthorCatalog.js";
import { Author } from "../Domain/Author.js";

export class AuthorRepository implements AuthorCatalog {



    public async getAuthor(id: number): Promise<Author | undefined>{
        
        const author = await prisma.author.findUnique({
            where: {
                id: id
            },
            include:{
                posts: true
            }
        });
        
        
        return undefined;
    }



    //
    private toDomain(dbAuthor: {
        id: number,
        name: string,
        email: string,
        password: string,
        posts: {
            id: number,
            title: string,
            description: string,
            author: undefined,
            authorId: number,
            tags: string,
        }[]
    }): Author | undefined {
        return new Author(
            String(dbAuthor.id),
            dbAuthor.name,
            dbAuthor.email,
            dbAuthor.password,
            dbAuthor.posts.map(post => new Post(
                String(post.id),
                post.title,
                post.description,
                post.author,// author hier undefined/leer lassen um zirkuläre Referenz zu vermeiden
                post.authorId,
                post.tags ? post.tags.split(",") : [],
            ))
        );
    }



}