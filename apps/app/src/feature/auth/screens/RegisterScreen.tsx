import { View, StyleSheet } from "react-native"
import { Appbar, Button, TextInput, Text } from "react-native-paper"
import { useLoginForm } from "../hooks/useLoginForm"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/RootStack";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useState } from "react";
import { PasswordInput } from "../components/passwordInput";
import { useAuth } from "../hooks/useAuth";

export default function RegisterScreen() {

    const form = useRegisterForm();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const toggleVisibility = () => setIsPasswordHidden(!isPasswordHidden);
    const { register } = useAuth();

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={'Sign Up'} />
            </Appbar.Header>
            <View style={styles.content}>
                <TextInput
                    mode="outlined"
                    label="Username"
                    value={form.username}
                    onChangeText={text => form.setUsername(text)}
                />
                                <TextInput
                    mode="outlined"
                    label="Email"
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
                <PasswordInput
                    label="Password"
                    value={form.password2}
                    onChangeText={form.setPassword2}
                    secureTextEntry={isPasswordHidden}
                    onIconPressed={toggleVisibility}
                />
                <Button mode="contained" onPress={() => register(form.username, form.email, form.password)}>
                    Sign Up
                </Button>
                <Text onPress={() => navigation.replace('Login')}variant="labelMedium" style={styles.hyperlink}>Already have an account? Sign in here!</Text>
            </View>
        </View>)
}
const styles = StyleSheet.create({
    content: {
        padding: 16,
        gap: 8,
    },
    hyperlink: {
        padding: 8,
        textAlign: 'center',
        color: 'darkblue',
    }
});