import type { Author } from "../Domain/Author.js";
import type { AuthorCatalog } from "../Domain/AuthorCatalog.js";
import { AuthorRepository } from "../Gateway/AuthorRepository.js";

export class AuthorService{

    loginAuthor(email: any, password: any): Author {
        throw new Error("Method not implemented.");
    }

    private static _instance: AuthorService;

    private repo:AuthorCatalog = new AuthorRepository;

    public static get Instance(): AuthorService {
        if (!this._instance) {
            this._instance = new AuthorService();
        }
        return this._instance;
    }

        public async getAllAuthors(): Promise<Author[]> {
        return this.repo.getAllAuthors();
    }

    public async getAuthor(id: number): Promise<Author | undefined> {
        return this.repo.getAuthor(id);
    }

    public async addAuthor(author: Author): Promise<Author> {
        return this.repo.addAuthor(author);
    }

    public async updateAuthor(author: Author): Promise<Author | undefined> {
        return this.repo.updateAuthor(author);
    }

    public async deleteAuthor(id: number): Promise<boolean> {
        return this.repo.deleteAuthor(id);
    }

}