import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { IAuthUser } from '../types';

interface IUserContextProps {
    user: IAuthUser | undefined,
    setUser: Dispatch<SetStateAction<IAuthUser | undefined>>
}

const UserContext = createContext({} as IUserContextProps);

export default UserContext;