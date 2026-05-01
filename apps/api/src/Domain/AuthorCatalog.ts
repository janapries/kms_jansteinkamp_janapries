import type { Author } from "./Author.js";

export interface AuthorCatalog {

    getAllAuthors(): Promise<Author[]>;
    getAuthor(id: number): Promise<Author | undefined>;
    addAuthor(author: Author): Promise<Author>;
    updateAuthor(author: Author): Promise<Author | undefined>;
    deleteAuthor(id: number): Promise<boolean>;

}