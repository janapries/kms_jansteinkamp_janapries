import { View, StyleSheet, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { RootStackParamList } from '../../../navigation/RootStack';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePosts } from "../../domain/PostProvider";


export default function DetailScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
    const { id } = route.params;


    const _onBack = () => {
        navigation.goBack();
    }

    const { getPost, removePost } = usePosts();
    const currentPost = getPost(id);

    const deletePost = () => {
        if (currentPost) {
            removePost(currentPost);
            navigation.navigate('Home');
        }
    };
    if (!currentPost) {
        return (
            <View style={styles.container}>
                <Appbar.Header><Appbar.BackAction onPress={_onBack} /></Appbar.Header>
                <Text style={{ padding: 16 }}>Post nicht gefunden.</Text>
            </View>
        );
    }



    // zeige mir post mit der id X aus der Liste Posts
    // instanz variable post
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={_onBack} />
                <Appbar.Content title="Post" />
            </Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.title}>{currentPost.title}</Text>
                <Text style={styles.author}>Von: {currentPost.author}</Text>
                <Text style={styles.description}>{currentPost.description}</Text>

            </View>

            <View style={styles.content}>
                <Button style={styles.button} mode="contained" onPress={()=> navigation.navigate('Create',{ id: id })}>
                    Edit Post
                </Button>
                <Button style={styles.buttonDelete} mode="contained" onPress={deletePost}>
                    Delete Post
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
    buttonContainer: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    author: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    description: {
        fontSize: 18,
        lineHeight: 26,
    },
    button: {
        marginBottom: 16
    },
    buttonDelete: {
        marginBottom: 16,
        backgroundColor: "firebrick"
    }
});