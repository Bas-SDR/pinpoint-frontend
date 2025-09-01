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

// import isTokenValid from "../../helpers/isTokenValid.js";

function SignIn() {
    const {login} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        login(data.email, data.password);
        //TODO Add POST to backend.
    };

    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token")
    //     if(token && isTokenValid(token)) {
    //         navigate("/profile");
    //     }
    // },[])
    // TODO Check once JWT is set up.

    return (
        <div className="outer-container-incl-sponsor signin-page">
            <SponsorBar sponsorLocation="left"/>
            <SponsorBar sponsorLocation="right"/>
            <Header>Inloggen</Header>
            <div className="signin-inner-container page-content">
                <p>Vul hier uw gegevens in om in te loggen:</p>

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
                </form>
                <p>Indien u nog niet geregistreerd ben, klik <Link to="/signup">hier</Link> om te registreren</p>
            </div>
        </div>
    );
}

export default SignIn;