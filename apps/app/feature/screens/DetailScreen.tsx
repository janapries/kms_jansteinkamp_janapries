import { View, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";


export default function DetailScreen() {

    const _onBack = () => { }

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={_onBack} />
                <Appbar.Content title="Post" />
            </Appbar.Header>

            <View style={styles.content}>
                <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
                    Edit Post
                </Button>
                <Button style={styles.buttonDelete} mode="contained" onPress={() => console.log('Pressed')}>
                    Delete Post
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