import { createContext, ReactNode, useState, useEffect } from "react";
import { Post } from "../../../../api/src/Domain/Post";
import { apiRequest } from "../../utils/apiClient";
import * as SecureStore from "expo-secure-store"

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

    const refreshPosts = async () => {
        try {
            const data = await apiRequest('posts', 'GET', SecureStore.getItem("token")!);
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
            await apiRequest('post', 'POST', SecureStore.getItem("token")!, newPost);
            refreshPosts();
        } catch (error) {
            console.error("Erstellen fehlgeschlagen:", error);
        }
    };

    const removePost = async (postId: string): Promise<void> => {
        try {
            await apiRequest(`post/${postId}`, 'DELETE', SecureStore.getItem("token")!);
            refreshPosts();
        } catch (error) {
            console.error("Löschen fehlgeschlagen:", error);
        }
    };

    const getPost = async (id: string): Promise<Post | undefined> => {
        try {
            return await apiRequest(`post/${id}`, 'GET', SecureStore.getItem("token")!);
        } catch (error) {
            console.error("Einzelner Abruf fehlgeschlagen:", error);
            return undefined;
        }
    };

    const updatePost = async (updatedPost: Post): Promise<void> => {
        try {
            await apiRequest(`post/${updatedPost.id}`, 'PUT', SecureStore.getItem("token")!, updatedPost);
            refreshPosts();
        } catch (error) {
            console.error("Update fehlgeschlagen:", error);
        }
    };

    return (
        <PostContext.Provider value={{ posts, addPost, removePost, getPost, updatePost, refreshPosts }}>
            {children}
        </PostContext.Provider>
    );
};