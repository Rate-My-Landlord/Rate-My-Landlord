import { useState, createContext } from 'react';
import { IAuthUser } from '../types';

const UserContext = createContext({
    user:{token: undefined, id: undefined} as IAuthUser | undefined,
    setUser: (user: IAuthUser) => { }
});

export default UserContext;