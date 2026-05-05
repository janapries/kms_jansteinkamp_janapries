import { createContext, ReactNode, useState } from "react";
import { apiRequest } from "../../utils/apiClient";

interface AuthState {
    userToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        const data = await apiRequest('user/login', 'POST', userToken!, { email, password });
        if (data.token) {
            setUserToken(data.token);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        const data = await apiRequest('user/register', 'POST', userToken!, { name, email, password });
        if (data.token) {
            setUserToken(data.token);
        }
    };
    return (
    <AuthContext value={{ userToken, login, register}}>
        {children}
    </AuthContext>
);
};