import { useEffect, useState } from "react";
import { usePosts } from "./usePosts";
import { Post } from "../../../../../api/src/Domain/Post";

export const usePost = (id?: string) => {
    const { getPost } = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getPost(id).then((data) => {
                if (data) setPost(data);
                setIsLoading(false);
            });
        }
    }, [id, getPost]);

    return { post, isLoading };
};