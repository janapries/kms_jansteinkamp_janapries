import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { RootStackParamList } from '../../navigation/RootStack';

export default function CreatePost() {

    const _onBack = () => { }
    const [title, setText] = React.useState("");
    const [auhtor, setAuthor] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState("");


    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={_onBack} />
                <Appbar.Content title="New Post" />
            </Appbar.Header>

            <View style={styles.content}>
                <TextInput
                    label="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={title => setText(title)}
                    maxLength={20}
                />
                <TextInput
                    label="Author"
                    style={styles.input}
                    value={auhtor}
                    onChangeText={auhtor => setAuthor(auhtor)}
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
                <Button mode="contained" onPress={() => console.log('Pressed')}>
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