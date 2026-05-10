import { View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/RootStack";


export default function ProfileScreen() {
    const { logout } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const _onBack = () => {
        navigation.goBack();
    };

    return <View>
        <Appbar.Header>
            <Appbar.BackAction onPress={_onBack} />
            <Appbar.Content title={'Profile'} />
        </Appbar.Header>
        <View>
            <Button mode="contained" onPress={() => { logout() }}>
                Logout
            </Button>
        </View>
    </View>
}