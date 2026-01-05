import './SignUp.css';
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import Header from "../../components/header/Header.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import React, {useState} from "react";
import axios from "axios";

function SignUp() {
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const [name, setName] = useState("")

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = async (data) => {
        setError(false);

        try {
            await axios.post("http://localhost:8080/users", {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                dob: data.dob,
                phone: data.phone
            });
            setName(data.firstName);
            setAccountCreated(true);

        } catch (e) {
            setError(true);
            if (e.response && e.response.data) {
                setErrorMsg(e.response.data);
            } else {
                setErrorMsg("Er is iets misgegaan, probeer het later opnieuw.");
            }
        }
    };
    return (
        <div className="outer-container-incl-sponsor">
            <Header>Registratie</Header>
            <SponsorBar sponsorLocation="left"/>
            <div className="page-content">
            <h2>Registreer je nu om door te gaan</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <p className="error-message">{errorMsg}</p>}
                <InputComponent
                    inputType="text"
                    inputName="firstName"
                    inputId="firstname-field"
                    validationRequired={true}
                    validationMessage="Dit veld is verplicht"
                    register={register}
                    errors={errors}
                >
                    Voornaam
                </InputComponent>
                <InputComponent
                    inputType="text"
                    inputName="lastName"
                    inputId="lastname-field"
                    validationRequired={true}
                    validationMessage="Dit veld is verplicht"
                    register={register}
                    errors={errors}
                >
                    Achternaam
                </InputComponent>
                <InputComponent
                    inputType="email"
                    inputName="email"
                    inputId="email-field"
                    validationRequired={true}
                    validationMessage="Dit veld is verplicht"
                    additionalValidation={{
                        pattern: {value:/^\S+@\S+$/i, message: "Een email moet de volgende format hebben: example@email.com"}}}
                    register={register}
                    errors={errors}
                >
                    Email
                </InputComponent>
                <InputComponent
                    inputType="password"
                    inputName="password"
                    inputId="password"
                    validationRequired={true}
                    validationMessage="Dit veld is verplicht"
                    additionalValidation={{
                    minLength: {value: 8, message: "Wachtwoord moet minimaal 8 tekens zijn"},
                    maxLength: {value: 64, message: "Wachtwoord mag maximaal 64 tekens zijn"}}}
                    register={register}
                    errors={errors}>
                    Wachtwoord
                </InputComponent>
                <InputComponent
                    inputType="date"
                    inputName="dob"
                    inputId="birthday-field"
                    validationRequired={false}
                    register={register}
                    errors={errors}
                >
                    Geboortedatum
                </InputComponent>
                <InputComponent
                    inputType="phone"
                    inputName="phone"
                    inputId="phone-field"
                    validationRequired={false}
                    additionalValidation={{
                        minLength: {value: 10, message: "Telefoonnummer moet minimaal 10 cijfers te zijn"},
                        maxLength: {value: 12, message: "Telefoonnummer mag maximaal 12 cijfers zijn"}}}
                    register={register}
                    errors={errors}
                >
                    Telefoonnummer
                </InputComponent>
                <p className="small-explanation">* is verplicht</p>
                <Button
                    type="submit">
                    Bevestigen
                </Button>
                {accountCreated && <p>Welkom {name}, je account is succesvol aangemaakt!</p>}
            </form>
            </div>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default SignUp;