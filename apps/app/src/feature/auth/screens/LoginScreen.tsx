import { View, StyleSheet } from "react-native"
import { Appbar, Button, TextInput, Text } from "react-native-paper"
import { useLoginForm } from "../hooks/useLoginForm"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/RootStack";
import { PasswordInput } from "../components/passwordInput";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {

    const form = useLoginForm();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const toggleVisibility = () => setIsPasswordHidden(!isPasswordHidden);
    const { login } = useAuth();

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={'Login'} />
            </Appbar.Header>
            <View style={styles.content}>
                <TextInput
                    mode="outlined"
                    label="Username"
                    value={form.email}
                    onChangeText={text => form.setEmail(text)}
                />
                <PasswordInput
                    label="Password"
                    value={form.password}
                    onChangeText={form.setPassword}
                    secureTextEntry={isPasswordHidden}
                    onIconPressed={toggleVisibility}
                />
                <Button mode="contained" onPress={() => login(form.email, form.password)}>
                    Login
                </Button>
                <Text onPress={() => navigation.replace('Register')} variant="labelMedium" style={styles.hyperlink}>Need an account? Sign up here!</Text>
            </View>
        </View>)
}
const styles = StyleSheet.create({
    content: {
        padding: 16,
        gap: 8
    },
    hyperlink: {
        padding: 8,
        textAlign: 'center',
        color: 'darkblue',
    }
});