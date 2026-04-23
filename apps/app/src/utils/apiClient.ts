import { Platform } from "react-native";

const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const apiRequest = async (path: string, method: string = 'GET', body?: any) => {
    try {
        const response = await fetch(`${BASE_URL}/${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Auth Token rein I guess
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Fehler: ${response.status}`);
        }

        if (response.status === 204) return null;

        return await response.json();
    } catch (error) {
        console.error(`API Error (${method} ${path}):`, error);
        throw error;
    }
}