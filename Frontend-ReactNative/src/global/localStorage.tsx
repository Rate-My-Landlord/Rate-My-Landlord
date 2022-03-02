import AsyncStorage from "@react-native-async-storage/async-storage"
import { IAuthUser } from "../types";

// Logout
export async function resetCreds() {
    await AsyncStorage.setItem('@user_cred', '');
}

export async function saveUserCredsToLocal(user_id: string, token: string) {
    if (user_id !== undefined && token !== undefined) {
        const user_obj = { token: token, user_id: user_id } as IAuthUser;
        const json_value = JSON.stringify(user_obj);
        await AsyncStorage.setItem('@user_cred', json_value);
    }
}

export default async function loadUserCredsFromLocal() {
    const json_value = await AsyncStorage.getItem('@user_cred');
    if (json_value) return JSON.parse(json_value) as IAuthUser;
    return null;
}