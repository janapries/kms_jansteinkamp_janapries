import { useState } from "react";

export interface PostData {
    id: string;
    title: string;
    author: string;
    description: string;
    tags: string[];
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