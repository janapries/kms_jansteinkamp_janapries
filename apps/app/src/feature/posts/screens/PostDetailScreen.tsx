import { View, StyleSheet, Text } from "react-native";
import { Appbar, Button, } from "react-native-paper";
import { RootStackParamList } from '../../../../navigation/RootStack';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePosts } from "../hooks/usePosts";
import { usePost } from "../hooks/usePost";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect, useState } from "react";

export default function PostDetailScreen() {

    const { removePost } = usePosts();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
    const postId = route.params?.id;
    const { post, isLoading } = usePost(postId);
    const { getUidFromToken } = useAuth();
    const [myUid, setMyUid] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyId = async () => {
            const uid = await getUidFromToken();
            if (uid) setMyUid(uid.toString()); // Sicherstellen, dass es ein String zum Vergleichen ist
        };
        fetchMyId();
    }, []);
    const isOwner = myUid === post?.authorId?.toString();

    const _onBack = () => {
        navigation.goBack();
    };

    const screenTitle = postId ? "Edit Post" : "New Post";
    if (isLoading) return <Text>Lade Daten...</Text>;
    if (!post) return <Text>Post nicht gefunden.</Text>;
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={_onBack} />
                <Appbar.Content title={screenTitle} />
            </Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.author}>Von: {post.author?.name}</Text>
                <Text style={styles.description}>{post.description}</Text>
            </View>
            <View style={styles.content}>
                {isOwner && (
                    <View style={styles.content}>
                        <Button
                            style={styles.button}
                            mode="contained"
                            onPress={() => navigation.navigate('Create', { id: postId })}
                        >
                            Edit Post
                        </Button>
                        <Button
                            style={styles.buttonDelete}
                            mode="contained"
                            onPress={async () => {
                                await removePost(postId);
                                navigation.goBack();
                            }}
                        >
                            Delete Post
                        </Button>
                    </View>
                )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
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
    },
    description: {
        fontSize: 18,
        lineHeight: 26,
    },
    button: {
        marginBottom: 16
    },

    input_description: {
        marginBottom: 16,
        backgroundColor: 'whitesmoke',
        borderColor: '#cccccc',
        minHeight: 150,
        borderRadius: 8,
    },
    buttonDelete: {
        marginBottom: 16,
        backgroundColor: 'firebrick',
    }
});