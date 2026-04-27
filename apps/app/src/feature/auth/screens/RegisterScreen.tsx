import { View, StyleSheet } from "react-native"
import { Appbar, Button, TextInput, Text } from "react-native-paper"
import { useLoginForm } from "../hooks/useLoginForm"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/RootStack";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useState } from "react";
import { PasswordInput } from "../components/passwordInput";

export default function RegisterScreen() {

    const form = useRegisterForm();

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const toggleVisibility = () => setIsPasswordHidden(!isPasswordHidden);

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
                <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Sign Up
                </Button>
                <Text onPress={() => console.log('Press Routing')} variant="labelMedium" style={styles.hyperlink}>Already have an account? Sign in here!</Text>
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