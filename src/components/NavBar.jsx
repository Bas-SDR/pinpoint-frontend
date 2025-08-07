import './NavBar.css';
import {useNavigate} from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();


    return (
        <>
            <div className="navbar-outer-box">
                <ul>
                    <li>Home</li>
                    <li>Info</li>
                    <li>Competitions</li>
                    <li>Nieuws</li>
                    <li>Contact</li>
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
        </>
    );
}

export default NavBar;