import AsyncStorage from "@react-native-async-storage/async-storage"
import { IAuthUser } from "../types";


export async function saveUserCredsToLocal(user_id: string, token: string) {
    console.log(`user_id: ${user_id} token: ${token}`);
    if (user_id !== undefined && token !== undefined) {
        const user_obj = { token: token, user_id: user_id } as IAuthUser;
        const json_value = JSON.stringify(user_obj);
        await AsyncStorage.setItem('@user_cred', json_value);
    }
}

export default async function loadUserCredsFromLocal() {
    return AsyncStorage.getItem('@user_cred');
}