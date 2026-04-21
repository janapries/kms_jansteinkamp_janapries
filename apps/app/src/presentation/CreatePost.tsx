import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { RootStackParamList } from '../../navigation/RootStack';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Post } from "../domain/Post";
import { usePosts } from "../domain/PostProvider";

export default function CreatePost() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Create'>>();
    const editId = route.params?.id;

    const { addPost, getPost, updatePost } = usePosts();

    const [existingPost, setExistingPost] = useState<Post | undefined>(undefined);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string | string[]>("");

    // Post laden wenn editId vorhanden
    useEffect(() => {
        if (editId) {
            const load = async () => {
                const post = await getPost(editId);
                setExistingPost(post);
            };
            load();
        }
    }, [editId]);

    // Felder befüllen sobald existingPost geladen ist
    useEffect(() => {
        if (existingPost) {
            setTitle(existingPost.title);
            setAuthor(existingPost.author);
            setDescription(existingPost.description);
            setTags(existingPost.tags);
        }
    }, [existingPost]);

    const _onBack = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        if (existingPost) {
            const tagsArray = typeof tags === "string"
                ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
                : tags;
            const updatedPost: Post = {
                id: existingPost.id,
                title,
                author,
                description,
                tags: tagsArray,
            };
            updatePost(updatedPost);
        } else {
            const newPost: Post = {
                id: Date.now().toString(),
                title,
                author,
                description,
                tags: [] as string[]
            };
            addPost(newPost);
        }
        navigation.navigate('Home');
    };

    const screenTitle = existingPost ? "Edit Post" : "New Post";

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={_onBack} />
                <Appbar.Content title={screenTitle} />
            </Appbar.Header>
            <View style={styles.content}>
                <TextInput
                    label="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={20}
                />
                <TextInput
                    label="Author"
                    style={styles.input}
                    value={author}
                    onChangeText={setAuthor}
                    maxLength={20}
                />
                <TextInput
                    label="Description"
                    style={styles.input_description}
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    maxLength={50}
                />
                <TextInput
                    label="Tags"
                    style={styles.input}
                    value={tags.toString()}
                    onChangeText={setTags}
                    maxLength={20}
                />
                <Button mode="contained" onPress={handleSubmit}>
                    Submit
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    content: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'whitesmoke',
        borderColor: '#cccccc',
        borderRadius: 8,
    },
    input_description: {
        marginBottom: 16,
        backgroundColor: 'whitesmoke',
        borderColor: '#cccccc',
        minHeight: 150,
        borderRadius: 8,
    }
});