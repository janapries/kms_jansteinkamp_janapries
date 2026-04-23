import { View, StyleSheet } from "react-native"
import { Appbar, Button, TextInput, Text } from "react-native-paper"
import { useLoginForm } from "../hooks/useLoginForm"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/RootStack";
import { useRegisterForm } from "../hooks/useRegisterForm";

export default function RegisterScreen() {

    const form = useRegisterForm();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={'Sign Up'} />
            </Appbar.Header>
            <View style={styles.content}>
                <TextInput style={styles.input}
                    mode="outlined"
                    label="Username"
                    value={form.username}
                    onChangeText={text => form.setUsername(text)}
                />
                <TextInput style={styles.input}
                    mode="outlined"
                    label="Password"
                    value={form.password}
                    onChangeText={text => form.setPassword(text)}
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                />
                                <TextInput style={styles.input}
                    mode="outlined"
                    label="Password"
                    value={form.password}
                    onChangeText={text => form.setPassword(text)}
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                />
                <Button style={styles.input} mode="contained" onPress={() => console.log('Pressed')}>
                    Login
                </Button>
                <Text onPress={()=> console.log('Press Routing')} variant="labelMedium" style={styles.hyperlink}>Need an account? Sign up here!</Text>
            </View>
        </View>)
}
const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    input: {
        marginBottom: 8,
        marginTop: 8,
    },
    hyperlink: {
        padding: 8,
        textAlign: 'center',
        color: 'darkblue',
    }
});