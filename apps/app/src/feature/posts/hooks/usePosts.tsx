import { useContext } from 'react';
import { PostContext } from '../PostProvider';

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) throw new Error("usePosts muss in einem PostProvider sein!");
    return context;
};