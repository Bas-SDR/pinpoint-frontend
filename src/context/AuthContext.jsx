import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        userId: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
            const token = localStorage.getItem("token");

            if (token) {
                const decodedToken = jwtDecode(token);
                if (isTokenValid(decodedToken)) {
                    toggleAuth({
                        isAuth: true,
                        user: {
                            email: decodedToken.email,
                            roles: decodedToken.roles,
                        },
                        userId: decodedToken.userId,
                        status: "done",
                    });
                } else {
                    logout();
                }
            } else {
                toggleAuth({
                    ...auth,
                    status: "done",
                })
            }
        }
        , []);

    function login(userDetails) {
        localStorage.setItem("token", userDetails.token);
        toggleAuth({
            isAuth: true,
            user: {
                email: userDetails.email,
                roles: userDetails.roles,
            },
            userId: userDetails.userId,
            status: "done",
        });
        navigate(`/profile/${userDetails.userId}`);
    }

    function logout() {
        toggleAuth({
            isAuth: false,
            userId: null,
            status: "done",
        });
        localStorage.removeItem("token");
        navigate("/");
    }

    const contextData = {
        isAuth: auth.isAuth,
        userId: auth.userId,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;