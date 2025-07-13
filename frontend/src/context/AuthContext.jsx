import { createContext, useEffect, useState } from "react";
import { isAuthenticated, logout, setToken } from "../utils/auth";

export const AuthContext = createContext({
    auth: null,
    setAuth: ()=>{},
    loading: true,
});

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const checkAuthStatus = async () => {
            setLoading(true);

            const user = isAuthenticated();

            if (user){
                setAuth(user);
            } else {
                setAuth(null);
            }

            setLoading(false);
        }

        checkAuthStatus();
    }, [] );

    const conTextValue = {
        auth,
        setAuth,
        loading,
    };

    return (
        <AuthContext.Provider value={conTextValue}>
            {children}
        </AuthContext.Provider>
    );
}