import { createContext, ReactNode, useState } from "react";
import { apiRequest } from "../../utils/apiClient";
import * as SecureStore from "expo-secure-store"
import { jwtDecode } from "jwt-decode";

interface AuthState {
    userToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getUidFromToken: () => Promise<number>
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        const data = await apiRequest('user/login', 'POST', "", { email, password });
        if (data.token) {
            SecureStore.setItem("token", data.token);
            setUserToken("refresh");
        }
    };

    const register = async (name: string, email: string, password: string) => {
        const data = await apiRequest('user/register', 'POST', "", { name, email, password });
        if (data.token) {
            SecureStore.setItem("token", data.token);
            setUserToken("refresh");
        }
    };

const getUidFromToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.uid;
    } catch (error) {
        console.error("Token konnte nicht decodiert werden:", error);
        return null;
    }
};

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync("token");
            setUserToken(null);
        } catch (error) {
            console.error("Logout fehlgeschlagen:", error);
        }
    };

    return (
        <AuthContext value={{ userToken, login, register, logout, getUidFromToken}}>
            {children}
        </AuthContext>
    );
};