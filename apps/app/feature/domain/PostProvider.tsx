import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post } from '../domain/Post';


interface PostState {
    posts: Post[];
    addPost: (newPost: Post) => void;
    removePost: (postToDelete: Post) => void;
    getPost: (id: string) => Post | undefined;
    updatePost: (updatedPost: Post) => void;
}

const PostContext = createContext<PostState | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {

    const [posts, setPosts] = useState<Post[]>([

    ]);


    const addPost = (newPost: Post) => {
        setPosts([newPost, ...posts]);
    };

    const removePost = (post: Post) => {
        const neueListe = posts.filter((post) => post !== post);
        setPosts(neueListe);
    };

    const getPost = (id: string) => {

        return posts.find((post) => post.id === id);
    };

    const updatePost = (updatedPost: Post) => {
        const neueListe = posts.map(post =>
            post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(neueListe);
    };

    return (
        <PostContext.Provider value={{ posts, addPost, removePost, getPost, updatePost }}>
            {children}
        </PostContext.Provider>
    );
};


export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) throw new Error("usePosts muss in einem PostProvider sein!");
    return context;
};
