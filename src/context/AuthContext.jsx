import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        userId: undefined,
    });
    const navigate = useNavigate();

    function login() {
        const newAuth = {
            isAuth: true,
            userId: 1,
        };
        toggleAuth(newAuth);
        navigate(`/profile/${newAuth.userId}`);
    }

    function logout() {
        toggleAuth({
            isAuth: false,
            userId: undefined,
        });
        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        userId: auth.userId,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;