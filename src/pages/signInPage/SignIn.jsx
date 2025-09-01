import './SignIn.css';
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import Header from "../../components/header/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";

// import isTokenValid from "../../helpers/isTokenValid.js";

function SignIn() {
    const {login} = useContext(AuthContext)
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState(false)
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token")
    //     if(token && isTokenValid(token)) {
    //         navigate("/profile");
    //     }
    // },[])
    // TODO Uncomment once JWT is set up.

    async function handleSubmit(e) {
        e.preventDefault();
        const controller = new AbortController();
        setError(false);
        try {
            const result = await axios.post("", {
                email: emailValue,
                password: passwordValue,
                signal: controller.signal,
            }, {
                headers: {}
            });
            login(result.data);
            // console.log(result.data);

            return function cleanup() {
                controller.abort();
            }

        } catch (e) {
            console.error(e);
            setError(true)
        }
    }

    //TODO Add axios functionality once backend is setup.

    return (
        <div className="outer-container-incl-sponsor signin-page">
            <SponsorBar sponsorLocation="left"/>
            <Header>Inloggen</Header>
            <div className="signin-inner-container">
                <p>Vul hier uw gegevens in om in te loggen:</p>

                <form className="signin-form">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    {error && <p>E-mail + wachtwoord combinatie is incorrect!</p>}
                    <Button
                        onClick={handleSubmit}
                    >Inloggen
                    </Button>
                    <p><Link to="auth/forgot">Wachtwoord vergeten</Link></p>
                </form>
                <p>Indien u nog niet geregistreerd ben, klik <Link to="/signup">hier</Link> om te registreren</p>
            </div>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default SignIn;