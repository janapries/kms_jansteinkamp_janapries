import { createContext, ReactNode, useState, useEffect } from "react";
import { Platform } from "react-native";
import { Post } from "../../../../api/src/Domain/Post";

const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

interface PostState {
    posts: Post[];
    addPost: (newPost: Post) => Promise<void>;
    removePost: (postId: string) => Promise<void>;
    getPost: (id: string) => Promise<Post | undefined>;
    updatePost: (updatedPost: Post) => Promise<void>;
}

export const PostContext = createContext<PostState | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {

    const [posts, setPosts] = useState<Post[]>([]);

    // Alle Posts beim Start laden
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/posts`);
                if (!response.ok) throw new Error('Fehler beim Laden');
                const json = await response.json();
                setPosts(json);
            } catch (error) {
                console.error(error);
            }
        };
        loadPosts();
    }, []);

    const addPost = async (newPost: Post): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) throw new Error('Fehler beim Erstellen');
            const created = await response.json();
            setPosts(prev => [created, ...prev]);
        } catch (error) {
            console.error(error);
        }
    };

    const removePost = async (postId: string): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/post/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Fehler beim Löschen');
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (error) {
            console.error(error);
        }
    };

    const getPost = async (id: string): Promise<Post | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/post/${id}`);
            if (!response.ok) throw new Error('Fehler beim Laden');
            const json = await response.json();
            return json as Post;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    const updatePost = async (updatedPost: Post): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/post/${updatedPost.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPost),
            });
            if (!response.ok) throw new Error('Fehler beim Aktualisieren');
            const updated = await response.json();
            setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PostContext.Provider value={{ posts, addPost, removePost, getPost, updatePost }}>
            {children}
        </PostContext.Provider>
    );
};