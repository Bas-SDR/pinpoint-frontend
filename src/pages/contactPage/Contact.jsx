import './Contact.css';
import Header from "../../components/header/Header.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import Button from "../../components/button/Button.jsx";
import {NavLink} from "react-router-dom";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import {useForm} from "react-hook-form";

function Contact() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        //TODO Add POST to backend.
    };

    return (
        <div className="outer-container-incl-sponsor">
            <SponsorBar sponsorLocation="left"/>
            <Header>Contact</Header>
            <br/>
            <h3>Neem via onderstaand formulier contact met ons op</h3>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <fieldset>
                    <legend><h2>Gegevens</h2></legend>
                    <div className="field-row">
                        <InputComponent
                            inputType="text"
                            inputName="firstName"
                            inputId="first-name-details"
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
                            inputId="last-name-details"
                            validationRequired={true}
                            validationMessage="Dit veld is verplicht"
                            register={register}
                            errors={errors}
                        >
                            Achternaam
                        </InputComponent>
                    </div>
                    <InputComponent
                        inputType="email"
                        inputName="email"
                        inputId="email-field"
                        validationRequired={true}
                        validationMessage="Dit veld is verplicht"
                        additionalValidation={{
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Een email moet de volgende format hebben: example@email.com"
                            }
                        }}
                        register={register}
                        errors={errors}
                    >
                        Email
                    </InputComponent>
                    <InputComponent
                        inputType="phone"
                        inputName="phoneNumber"
                        inputId="phone-field"
                        validationRequired={false}
                        additionalValidation={{
                            minLength: {value: 10, message: "Telefoonnummer moet minimaal 10 cijfers te zijn"},
                            maxLength: {value: 12, message: "Telefoonnummer mag maximaal 12 cijfers zijn"}
                        }}
                        register={register}
                        errors={errors}
                    >
                        Telefoonnummer
                    </InputComponent>
                </fieldset>
                <fieldset>
                    <legend><h2>Jouw review</h2></legend>
                    <InputComponent
                        inputType="text"
                        inputName="subject"
                        inputId="form-subject"
                        validationRequired={true}
                        validationMessage="Dit veld is verplicht"
                        register={register}
                        errors={errors}
                    >
                        Onderwerp
                    </InputComponent>
                    <label htmlFor="form-comments">
                        Opmerkingen:
                        <textarea
                            id="form-comments"
                            placeholder="Typ hier uw bericht"
                            rows="10"
                            cols="40"
                            {...register("comments", {required: "Vul uw bericht in"})}
                        />
                    </label>
                    <InputComponent
                        inputType="checkbox"
                        inputName="privacy"
                        inputId="privacy-checkbox"
                        className="checkbox-label"
                        validationRequired={true}
                        validationMessage="Je moet akkoord gaan met de voorwaarden"
                        register={register}
                        errors={errors}
                    >
                        Ik ga akkoord met het <NavLink to="/privacy">Privacy beleid</NavLink>
                    </InputComponent>
                    <Button
                        type="submit"
                        disabled={!isValid}
                    >
                        Versturen
                    </Button>
                </fieldset>
            </form>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default Contact;