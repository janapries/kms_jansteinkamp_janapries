import { View } from "react-native";
import { TextInput } from "react-native-paper";

interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry: boolean;
    onIconPressed: () => void;
    label?: string;
    style?: any;
}

export const PasswordInput = ({ 
    value, 
    onChangeText, 
    secureTextEntry, 
    onIconPressed, 
    label = "Password", 
    style 
}: PasswordInputProps) => {
    return (
        <View style={style}>
            <TextInput
                mode="outlined"
                label={label}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                right={
                    <TextInput.Icon 
                        icon={secureTextEntry ? "eye-off" : "eye"} 
                        onPress={onIconPressed}
                    />
                }
            />
        </View>
    );
};