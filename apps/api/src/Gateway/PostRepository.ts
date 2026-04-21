import { prisma } from "@repo/db";

export class PostRepository{
    
    /**
     * name
     */
    public async getUser() {
        const user = await prisma.user.findFirst();
        console.log("user");
        console.log(user);
        //return user;
    }
}