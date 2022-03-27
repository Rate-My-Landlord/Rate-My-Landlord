import { createContext, useContext } from "react";
import { IAuthUser } from "../types";
import loadUserCredsFromLocal from "./localStorage";

export interface IUserContext {
    user: IAuthUser | null,
    setUser: (user: IAuthUser | null) => void,
}

export const UserContext = createContext<IUserContext>({} as IUserContext);