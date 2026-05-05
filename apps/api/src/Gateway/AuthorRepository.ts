import { prisma } from "@repo/db/lib/prisma";
import { Post } from "../Domain/Post.js";
import type { AuthorCatalog } from "../Domain/AuthorCatalog.js";
import { Author } from "../Domain/Author.js";

export class AuthorRepository implements AuthorCatalog {

    public async getAllAuthors(): Promise<Author[]> {
        const authors = await prisma.author.findMany({
            include: { posts: true }
        });

        return authors.map(a => this.toDomain(a)).filter(a => a !== undefined);
    }

    public async getAuthor(id: number): Promise<Author | undefined> {
        const author = await prisma.author.findUnique({
            where: { id },
            include: { posts: true }
        });

        return author ? this.toDomain(author) : undefined;
    }

    public async addAuthor(author: Author): Promise<Author> {
        const created = await prisma.author.create({
            data: {
                name: author.name,
                email: author.email,
                password: author.password,
            },
            include: { posts: true }
        });

        return this.toDomain(created)!;
    }

    public async updateAuthor(author: Author): Promise<Author | undefined> {
        const numericId = Number(author.id);
        if (Number.isNaN(numericId)) return undefined;

        try {
            const updated = await prisma.author.update({
                where: { id: numericId },
                data: {
                    name: author.name,
                    email: author.email,
                    password: author.password,
                },
                include: { posts: true }
            });

            return this.toDomain(updated);
        } catch {
            return undefined;
        }
    }

    public async deleteAuthor(id: number): Promise<boolean> {
        try {
            await prisma.author.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    }

    private toDomain(dbAuthor: {
        id: number,
        name: string,
        email: string,
        password: string,
        posts: {
            id: number,
            title: string,
            description: string,
            authorId: number,
            tags: string,
        }[]
    }): Author {
        return new Author(
            String(dbAuthor.id),
            dbAuthor.name,
            dbAuthor.email,
            dbAuthor.password,
            dbAuthor.posts.map(post => new Post(
                String(post.id),
                post.title,
                post.description,
                undefined,
                post.authorId,
                post.tags ? post.tags.split(",") : [],
            ))
        );
    }
}