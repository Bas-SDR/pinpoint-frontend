import './NavBar.css';
import {useNavigate, NavLink} from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../button/Button.jsx";

function NavBar() {
    const navigate = useNavigate();
    const {isAuth, userId, roles, logout} = useContext(AuthContext);
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
                        {isAuth === true && roles.includes("ROLE_ADMIN") && (
                        <li>
                            <NavLink to="/admin" className={checkActiveLink}>Admin</NavLink>
                        </li>
                        )}
                    </ul>
                    <div>
                        {isAuth ?
                            <Button
                                type="button"
                                onClick={() => navigate(`/profile/${userId}`)}
                            >
                                My profile
                            </Button>
                            :
                            <Button
                                type="button"
                                onClick={() => navigate(`/signin`)}
                            >
                                Log in
                            </Button>
                        }
                        {isAuth ?
                            <Button
                                type="button"
                                onClick={logout}
                            >
                                Sign out
                            </Button>
                            :
                            <Button
                                type="button"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </Button>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;