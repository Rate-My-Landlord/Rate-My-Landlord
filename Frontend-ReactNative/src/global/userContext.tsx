import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { IAuthUser } from '../types';

interface IUserContextProps {
    user: IAuthUser | null,
    setUser: Dispatch<SetStateAction<IAuthUser | null>>
}

const UserContext = createContext({} as IUserContextProps);

export default UserContext;