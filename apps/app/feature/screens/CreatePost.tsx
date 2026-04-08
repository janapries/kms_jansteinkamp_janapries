import React, { useState } from "react";
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

    const existingPost = editId ? getPost(editId) : undefined;

    const _onBack = () => {
        navigation.goBack();
    }
    const [title, setTitle] = useState(existingPost ? existingPost.title : "");
    const [author, setAuthor] = useState(existingPost ? existingPost.author : "");
    const [description, setDescription] = useState(existingPost ? existingPost.description : "");
    const [tags, setTags] = useState("");

    const handleSubmit = () => {
        if (existingPost) {
            const updatedPost: Post = {
                id: existingPost.id,
                title: title,
                author: author,
                description: description,
                tags: [] as any
            }
            updatePost(updatedPost);
        }
        else {
            const newPost: Post = {
                id: Date.now().toString(),
                title: title,
                author: author,
                description: description,
                tags: [] as any
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
                    onChangeText={title => setTitle(title)}
                    maxLength={20}
                />
                <TextInput
                    label="Author"
                    style={styles.input}
                    value={author}
                    onChangeText={author => setAuthor(author)}
                    maxLength={20}
                />
                <TextInput
                    label="Description"
                    style={styles.input_description}
                    value={description}
                    onChangeText={description => setDescription(description)}
                    multiline={true}
                    maxLength={50}
                />
                <TextInput
                    label="Tags"
                    style={styles.input}
                    value={tags}
                    onChangeText={tags => setTags(tags)}
                    maxLength={20}
                />
                <Button mode="contained" onPress={handleSubmit}>
                    Submit
                </Button>
            </View>
        </View>

    )
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
