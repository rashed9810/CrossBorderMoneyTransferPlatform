'use client'
import { createContext, ReactNode, useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { decodedUser } from "../hooks/useUser";

interface AuthContextType {
    user: string;
    setUser: (value: string) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
};
interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);


const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const userFromSession =  decodedUser;

    const [user, setUser] = useState(() => {
        const storedUser = typeof window !== "undefined" ? localStorage.getItem('user') : null;
        return storedUser ? JSON.parse(storedUser) : [];
    });


    useEffect(() => {
        setLoading(true);
        setUser(userFromSession);
        setLoading(false);
        if (user) {
            typeof window !== "undefined" ? localStorage.setItem('user', JSON.stringify(user)) : null;
            setLoading(false);
        } 
    }, [user, userFromSession]);


    const info: AuthContextType = {
        user,
        setUser,
        loading,
        setLoading
    };

    return <AuthContext.Provider value={info}>
        {children}
    </AuthContext.Provider>
};

export default AuthContextProvider;
