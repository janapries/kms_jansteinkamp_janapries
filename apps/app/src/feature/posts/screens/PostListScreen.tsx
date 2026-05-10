
import { Appbar, List } from 'react-native-paper';
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/RootStack';
import { usePosts } from "../hooks/usePosts";
import React, { useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';


export default function PostListScreen() {

    // use Nav braucht die Paramliste wegen der Overload Fehlermeldung, gekommen durch AI nachfrag, NavigationsQuelle war React doc
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const isFocused = useIsFocused();
    const { posts, refreshPosts } = usePosts();

    useEffect(() => {
        if (isFocused) {
            refreshPosts();
        }
    }, []);

    const _onCreatePost = () => {
        navigation.navigate('Create')
    }
    const _onProfile = () => {
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Posts" />
                <Appbar.Action icon="plus" onPress={_onCreatePost} />
                <Appbar.Action icon="baby-face-outline" onPress={_onProfile} />
            </Appbar.Header>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
                        <List.Item
                            title={item.title}
                            description={`${item.author?.name}: ${item.description}`}
                            left={props => <List.Icon {...props} icon="text-box" />}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});