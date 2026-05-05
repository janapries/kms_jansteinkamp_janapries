import { createContext, ReactNode, useState, useEffect } from "react";
import { Post } from "../../../../api/src/Domain/Post";
import { apiRequest } from "../../utils/apiClient";
import { useAuth } from "../auth/hooks/useAuth";

interface PostState {
    posts: Post[];
    addPost: (newPost: Post) => Promise<void>;
    removePost: (postId: string) => Promise<void>;
    getPost: (id: string) => Promise<Post | undefined>;
    updatePost: (updatedPost: Post) => Promise<void>;
    refreshPosts: () => Promise<void>;
}

export const PostContext = createContext<PostState | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {

    const [posts, setPosts] = useState<Post[]>([]);
    const { userToken } = useAuth();

    const refreshPosts = async () => {
        try {
            const data = await apiRequest('posts', 'GET', userToken!);
            setPosts(data);
        } catch (error) {
            console.error("Fehler beim Erneuern der Posts:", error);
        }
    };

    // Alle Posts beim Start laden
    useEffect(() => {
        refreshPosts();
    }, []);

    const addPost = async (newPost: Post): Promise<void> => {
        try {
            await apiRequest('post', 'POST', userToken!, newPost);
            refreshPosts();
        } catch (error) {
            console.error("Erstellen fehlgeschlagen:", error);
        }
    };

    const removePost = async (postId: string): Promise<void> => {
        try {
            await apiRequest(`post/${postId}`, 'DELETE', userToken!);
            refreshPosts();
        } catch (error) {
            console.error("Löschen fehlgeschlagen:", error);
        }
    };

    const getPost = async (id: string): Promise<Post | undefined> => {
        try {
            return await apiRequest(`post/${id}`, 'GET', userToken!);
        } catch (error) {
            console.error("Einzelner Abruf fehlgeschlagen:", error);
            return undefined;
        }
    };

    const updatePost = async (updatedPost: Post): Promise<void> => {
        try {
            await apiRequest(`post/${updatedPost.id}`, 'PUT', userToken!, updatedPost);
            refreshPosts();
        } catch (error) {
            console.error("Update fehlgeschlagen:", error);
        }
    };

    return (
        <PostContext.Provider value={{ posts, addPost, removePost, getPost, updatePost, refreshPosts}}>
            {children}
        </PostContext.Provider>
    );
};