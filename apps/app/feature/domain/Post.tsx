import { useState } from "react";

export interface PostData {
    id: string;
    title: string;
    author: string;
    description: string;
    tags: [];
}
export interface Post extends PostData { }

export class Post {
    constructor({ id, title, author, description, tags }: PostData) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.tags = tags;
    }

}

export default function GlobalPosts() {
    const [posts] = useState<Post[]>([
        {
            id: "1",
            title: "Testpost",
            author: "Jen",
            description: "Test Post",
            tags: []
        },
    ]);
}