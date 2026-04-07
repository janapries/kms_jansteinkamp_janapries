import { View, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { RootStackParamList } from '../../navigation/RootStack';


export default function DetailScreen() {

    const _onBack = () => { }

    // zeige mir post mit der id X aus der Liste Posts
    // instanz variable post
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={_onBack} />
                <Appbar.Content title="Post" />
            </Appbar.Header>

            <View style={styles.content}>
                <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
                    Edit Post
                    // wir rufen die create seite auf oder eine update
                </Button>
                <Button style={styles.buttonDelete} mode="contained" onPress={() => console.log('Pressed')}>
                    Delete Post
                    // remove from list
                </Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    button: {
        marginBottom: 16
    },
    buttonDelete: {
        marginBottom: 16,
        backgroundColor: "firebrick"
    }
});