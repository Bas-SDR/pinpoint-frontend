import './SignUp.css';
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import Header from "../../components/header/Header.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // register(data.email, data.password);
        //TODO Add POST to backend and register function to AuthContext.
    };


    return (
        <div className="outer-container-incl-sponsor">
            <Header>Registratie</Header>
            <SponsorBar sponsorLocation="left"/>
            <div className="page-content">
            <h2>Registreer je nu om door te gaan</h2>
            <div className="signup-form">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    inputType="date"
                    inputName="birthday"
                    inputId="birthday-field"
                    validationRequired={false}
                    register={register}
                    errors={errors}
                >
                    Geboortedatum
                </InputComponent>
                <InputComponent
                    inputType="phone"
                    inputName="phoneNumber"
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
            </form>
            </div>
            </div>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default SignUp;