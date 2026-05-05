import type { Author } from "../Domain/Author.js";
import type { AuthorCatalog } from "../Domain/AuthorCatalog.js";
import { AuthorRepository } from "../Gateway/AuthorRepository.js";
import bcrypt from "bcrypt";


export class AuthorService{


    private saltRounds = 10;

    public async loginAuthor(email: string, password: string): Promise<Author | undefined> {
        // 1. Author per Email aus DB holen
        const author = await this.repo.getAuthorByEmail(email);
        console.log("Author gefunden:", author);
        if (!author) return undefined;

        // 2. Eingegebenes Passwort mit gespeichertem Hash vergleichen
        const isValid = await bcrypt.compare(password, author.password);
        console.log("Passwort gültig:", isValid);
        if (!isValid) return undefined;

        // 3. Author zurückgeben (Token wird in der Boundary gebaut)
        return author;
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
        console.log("pw: " + author.password);
        
        // Promise-Version abwarten statt Callback
        const hashedPW = await bcrypt.hash(author.password, this.saltRounds);
        
        author.password = hashedPW;
        console.log("pw hashed: " + author.password);

        return this.repo.addAuthor(author);
    }

    public async updateAuthor(author: Author): Promise<Author | undefined> {
        return this.repo.updateAuthor(author);
    }

    public async deleteAuthor(id: number): Promise<boolean> {
        return this.repo.deleteAuthor(id);
    }

}