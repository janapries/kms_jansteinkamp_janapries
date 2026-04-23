import { View, StyleSheet } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { RootStackParamList } from '../../../../navigation/RootStack';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePostForm } from "../hooks/usePostForm";

export default function CreatePost() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Create'>>();
    const editId = route.params?.id;

    const post = usePostForm(editId);

    const _onBack = () => {
        navigation.goBack();
    };
    const screenTitle = editId ? "Edit Post" : "New Post";

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
                    value={post.title}
                    onChangeText={post.setTitle}
                    maxLength={20}
                />
                <TextInput
                    label="Author"
                    style={styles.input}
                    value={post.author}
                    onChangeText={post.setAuthor}
                    maxLength={20}
                />
                <TextInput
                    label="Description"
                    style={styles.input_description}
                    value={post.description}
                    onChangeText={post.setDescription}
                    multiline={true}
                    maxLength={50}
                />
                <TextInput
                    label="Tags"
                    style={styles.input}
                    value={post.tags}
                    onChangeText={post.setTags}
                    maxLength={20}
                />
                <Button mode="contained" onPress={() => {post.submit(); navigation.pop()}}>
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