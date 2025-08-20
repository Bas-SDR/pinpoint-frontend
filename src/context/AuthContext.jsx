import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        userId: null,
    });
    const navigate = useNavigate();

    function login() {
        toggleAuth({
            isAuth: true,
            userId: 1,
        });

        navigate('/profile');
    }

    function logout() {
        toggleAuth({
            isAuth: false,
            userId: null,
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