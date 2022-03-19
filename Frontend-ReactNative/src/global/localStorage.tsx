import AsyncStorage from "@react-native-async-storage/async-storage"
import { IAuthUser } from "../types";

// Logout
export async function resetCreds() {
    await AsyncStorage.setItem('@user_cred', '');
}

export async function getRefreshToken(): Promise<string | null> {
    return await AsyncStorage.getItem('@refreshToken');
}

export async function saveUserCredsToLocal(userId: string, accessToken: string, refreshToken?: string) {
    if (userId !== undefined && accessToken !== undefined) {
        const userObj = { accessToken: accessToken, userId: userId, } as IAuthUser;
        const jsonValue = JSON.stringify(userObj);
        await AsyncStorage.setItem('@user_cred', jsonValue);
    }
    if (refreshToken !== undefined) {
        await AsyncStorage.setItem('@refreshToken', refreshToken);
    }
}

export default async function loadUserCredsFromLocal() {
    const jsonValue = await AsyncStorage.getItem('@user_cred');
    if (jsonValue) return JSON.parse(jsonValue) as IAuthUser;
    return null;
}