import { useEffect, useState } from "react";
import { usePosts } from "./usePosts";
import { Post } from "../../../../../api/src/Domain/Post";


export const usePostForm = (editId?: string) => {
    const { addPost, updatePost, getPost } = usePosts();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        if (editId) {
            getPost(editId).then((post) => {
                if (post) {
                    setTitle(post.title);
                    setAuthor(post.author);
                    setDescription(post.description);
                    setTags(post.tags.join(", "));
                }
            });
        }
    }, [editId]);

    const submit = async () => {
        const tagsArray = tags.split(',').map(t => t.trim());

        const postData: Post = {
            title,
            tags: tagsArray,
            id: editId || Date.now().toString(),
            description: description,
            author: author
        };

        if (editId) {
            updatePost(postData);
        } else {
            addPost(postData);
        }
    };

    return { title, setTitle, tags, setTags, submit, description, setDescription, author, setAuthor, getPost };
};