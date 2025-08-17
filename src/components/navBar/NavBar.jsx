import './NavBar.css';
import {useNavigate, NavLink} from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const navigate = useNavigate();
    const {isAuth, login, logout} = useContext(AuthContext);
    const checkActiveLink = ({isActive}) => isActive === true ? "active-link" : "default-link";

    return (
        <>
            <nav className="navbar-outer-box">
                <div className="navbar-inner-box">
                    <ul>
                        <li>
                            <NavLink to="/" className={checkActiveLink}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/info" className={checkActiveLink}>
                                Info
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/competitions" className={checkActiveLink}>Competitions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/news" className={checkActiveLink}>Nieuws</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={checkActiveLink}>Contact</NavLink>
                        </li>
                        {isAuth === true && //TODO Add check for role in JWT instead of login status.
                        <li>
                            <NavLink to="/admin" className={checkActiveLink}>Admin</NavLink>
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