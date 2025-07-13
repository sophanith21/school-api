import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
    // Implement your authentication logic here
    const token = localStorage.getItem('jwt_token');

    if (token){
        try{
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp){
                if (decodedToken.exp * 1000 > Date.now()){
                    return decodedToken;
                } else {
                    console.warn('JWT token found but is expired.');
                    logout();
                    return null;
                }
                
            } else {
                console.warn('JWT token found with no expiration date.')
                return decodedToken;
            }
        } catch (err) {
            console.error('Error decoding JWT token',err);
            logout();
            return null;
        }
    }
    return null;
}

export function setToken(token) {
    // implement your logic to set the token
    localStorage.setItem('jwt_token',token);
}

export function logout() {
    // implement your logic to remove the token
    localStorage.removeItem('jwt_token');
}