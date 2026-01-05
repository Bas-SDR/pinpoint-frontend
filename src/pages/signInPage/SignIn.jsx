import './SignIn.css';
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import Header from "../../components/header/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import isTokenValid from "../../helpers/isTokenValid.js";

function SignIn() {
    const {login} = useContext(AuthContext);

    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = async (data) => {
        setError(false);

        try {
            const controller = new AbortController();

            const result = await axios.post(
                "http://localhost:8080/auth",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    signal: controller.signal,
                }
            );
            login(result.data);

            return function cleanup() {
                controller.abort();
            }

        } catch (e) {
            console.error(e);
            setError(true);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isTokenValid(token)) {
            navigate("/profile");
        }
    }, []);

    return (
        <div className="outer-container-incl-sponsor signin-page">
            <SponsorBar sponsorLocation="left"/>
            <SponsorBar sponsorLocation="right"/>
            <Header>Inloggen</Header>
            <div className="signin-inner-container page-content">
                <h3>Vul hier uw gegevens in om in te loggen:</h3>
                {error && <p className="error-message">Verkeerde email / wachtwoord combinatie.</p>}
                <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
                    <InputComponent
                        inputType="email"
                        inputName="email"
                        inputId="email-field"
                        validationRequired={true}
                        validationMessage="Dit veld is verplicht"
                        register={register}
                        errors={errors}>
                        Email
                    </InputComponent>
                    <InputComponent
                        inputType="password"
                        inputName="password"
                        inputId="password-field"
                        validationRequired={true}
                        validationMessage="Dit veld is verplicht"
                        register={register}
                        errors={errors}>
                        Wachtwoord
                    </InputComponent>
                    <Button
                        type="submit">
                        Inloggen
                    </Button>
                    <p><Link to="auth/forgot">Wachtwoord vergeten</Link></p>
                    <p>Indien u nog niet geregistreerd ben, klik <Link to="/signup">hier</Link> om te registreren</p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;