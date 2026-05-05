import { createContext, ReactNode, useState } from "react";
import { apiRequest } from "../../utils/apiClient";
import * as SecureStore from "expo-secure-store"

interface AuthState {
    userToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
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

    return (
    <AuthContext value={{userToken, login, register}}>
        {children}
    </AuthContext>
);
};