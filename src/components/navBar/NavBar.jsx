import './NavBar.css';
import {useNavigate, NavLink} from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();


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
                    </ul>
                    <div>

                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/logout')}
                            //TODO Add logout functionality and navigate to home page after logout
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;