import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";


export default function ProtectedRoute ({children}){
    if (!isAuthenticated()){
        return <Navigate to='/' replace/>
    } else {
        return (
        <>
            {children}
        </>
    );
    }
}