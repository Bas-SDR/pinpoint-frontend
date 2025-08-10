import './NavBar.css';
import {useNavigate, NavLink} from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const navigate = useNavigate();
    const {isAuth, login, logout} = useContext(AuthContext);

    return (
        <>
            <nav className="navbar-outer-box">
                <div className="navbar-inner-box">
                    <ul>
                        <li>
                            <NavLink to="/"
                                     className={({isActive}) => isActive === true ? "active-link" : "default-link"}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/info"
                                     className={({isActive}) => isActive === true ? "active-link" : "default-link"}>
                                Info
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/competitions"
                                     className={({isActive}) => isActive === true ? "active-link" : "default-link"}>
                                Competitions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news"
                                     className={({isActive}) => isActive === true ? "active-link" : "default-link"}>Nieuws</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"
                                     className={({isActive}) => isActive === true ? "active-link" : "default-link"}>Contact</NavLink>
                        </li>
                        {isAuth === true && //TODO Add check for role in JWT instead of login status.
                        <li>
                            <NavLink to="/admin"
                                     className={({isActive}) => isActive === true ? "active-link" : "default-link"}>Admin</NavLink>
                        </li>}
                    </ul>
                    <div>
                        {isAuth ?
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                            >
                                My profile
                            </button>
                            :
                            <button
                                type="button"
                                onClick={login}
                            >
                                Log in
                            </button>
                        }
                        {isAuth ?
                            <button
                                type="button"
                                onClick={logout}
                            >
                                Sign out
                            </button>
                            :
                            <button
                                type="button"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;