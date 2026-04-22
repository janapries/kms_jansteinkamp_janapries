import { prisma } from "@repo/db/lib/prisma";
import { Post } from "../Domain/Post.js";

export class PostRepository {

    public async getAllPosts(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return posts.map(this.toDomain);
    }

    public async getPostById(id: string): Promise<Post | undefined> {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) return undefined;

        const post = await prisma.post.findUnique({
            where: { id: numericId },
        });

        return post ? this.toDomain(post) : undefined;
    }

    public async addPost(post: Post): Promise<Post> {
        const created = await prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                author: post.author,
                tags: post.tags.join(","),
            },
        });
        return this.toDomain(created);
    }

    public async updatePost(post: Post): Promise<Post | undefined> {
        const numericId = Number(post.id);
        if (Number.isNaN(numericId)) return undefined;

        try {
            const updated = await prisma.post.update({
                where: { id: numericId },
                data: {
                    title: post.title,
                    description: post.description,
                    author: post.author,
                    tags: post.tags.join(","),
                },
            });
            return this.toDomain(updated);
        } catch {
            return undefined;
        }
    }

    public async deletePost(id: string): Promise<boolean> {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) return false;

        try {
            await prisma.post.delete({ where: { id: numericId } });
            return true;
        } catch {
            return false;
        }
    }

    public async addDemoPost(): Promise<Post> {
        const created = await prisma.post.create({
            data: {
                title: `Demo Post ${Date.now()}`,
                description: "Das ist ein automatisch generierter Demo-Post.",
                author: "DemoAuthor",
                tags: "demo,test,automated",
            },
        });
        return this.toDomain(created);
    }

    private toDomain(dbPost: {
        id: number;
        title: string;
        description: string;
        author: string;
        tags: string;
    }): Post {
        return new Post(
            String(dbPost.id),
            dbPost.title,
            dbPost.description,
            dbPost.author,
            dbPost.tags ? dbPost.tags.split(",") : [],
        );
    }
}