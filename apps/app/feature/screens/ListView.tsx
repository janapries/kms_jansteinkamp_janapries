import React, { useState } from "react";
import { Appbar, List } from 'react-native-paper';
import { View, FlatList, StyleSheet } from "react-native";
import { Post } from '../domain/Post';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStack';

export default function ListView() {

    // use Nav braucht die Paramliste wegen der Overload Fehlermeldung, gekommen durch AI nachfrag, NavigationsQuelle war React doc
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [posts] = useState<Post[]>([
        {
            id: "1",
            title: "Testpost",
            author: "Jen",
            description: "Test Post",
            tags: []
        },
    ]);

    const _onCreatePost = () => {
        navigation.navigate('Create')
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Posts" />
                <Appbar.Action icon="plus" onPress={_onCreatePost} />
            </Appbar.Header>
            <FlatList
                data={posts}
                keyExtractor={(post) => post.id}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.title}
                        description={`${item.author}: ${item.description}`}
                        left={props => <List.Icon {...props} icon="text-box" />}
                    />
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