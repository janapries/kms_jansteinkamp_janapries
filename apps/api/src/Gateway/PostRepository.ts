import { prisma } from "@repo/db/lib/prisma";
import { Post } from "../Domain/Post.js";
import { Author } from "../Domain/Author.js";

export class PostRepository {

    // https://www.prisma.io/docs/v6/orm/prisma-client/queries/relation-queries
    public async getAllPosts(): Promise<Post[]> {
        const posts = await prisma.post.findMany(
            {
                include: {
                    author: true
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        )

        return posts.map(this.toDomain);
    }

    public async getPostById(id: number): Promise<Post | undefined> {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) return undefined;

        const post = await prisma.post.findUnique({
            where: { id: numericId },
            include: {
                author: true
            }
        });

        return post ? this.toDomain(post) : undefined;
    }

    // relationen müssen connected werden. Keine raw objs, daher connect mit fk prop
    public async addPost(post: Post): Promise<Post> {
        const created = await prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                author: {
                    connect:
                    {
                        id: post.authorId
                    }
                },
                tags: post.tags.join(","),
            },
            include:{
                author: true
            }
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
                    author: {
                        connect: {
                            id: post.authorId
                        }
                    },
                    tags: post.tags.join(","),
                },
                include: {
                    author: true
                }
            });
            return this.toDomain(updated);
        } catch {
            return undefined;
        }
    }

    public async deletePost(id: number): Promise<boolean> {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) return false;

        try {
            await prisma.post.delete({ where: { id: numericId } });
            return true;
        } catch {
            return false;
        }
    }



    private toDomain(dbPost: {
        id: number;
        title: string;
        description: string;
        authorId: number;
        tags: string;
        author: {
            id:       number
            name:     string
            email:    string
            password: string
        }
    }): Post {
        const author = new Author(      
            dbPost.author.id,
            dbPost.author.name,
            dbPost.author.email,
            dbPost.author.password,
            []                         
        );

        return new Post(
            dbPost.id,
            dbPost.title,
            dbPost.description,
            author,                 
            dbPost.authorId,
            dbPost.tags ? dbPost.tags.split(",") : [],
        );
    }

}