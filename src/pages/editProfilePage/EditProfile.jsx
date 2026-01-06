import './EditProfile.css';
import { useForm } from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import Header from "../../components/header/Header.jsx";
import InputComponent from "../../components/inputComponent/InputComponent.jsx";
import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProfile() {
    const { playerId } = useParams();

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [accountUpdated, setAccountUpdated] = useState(false);
    const [profilePic, setProfilePic] = useState("");

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProfile() {
            try {
                const result = await axios.get(
                    `http://localhost:8080/users/${playerId}/private`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal
                    }
                );

                const data = result.data;
                setValue("firstName", data.firstName);
                setValue("lastName", data.lastName);
                setValue("email", data.email);
                setValue("dob", data.dob);
                setValue("phone", data.phone);
                setProfilePic(data.profilePic || "");
            } catch (e) {
                console.error(e);
                setError(true);
                setErrorMsg("Er is iets misgegaan bij het ophalen van je profiel.");
            }
        }

        fetchProfile();

        return function cleanUp() {
            controller.abort();
        };
    }, [playerId, token, setValue]);

    async function handleProfilePicUpload(file) {
        //https://stackoverflow.com/questions/53914361/upload-a-file-in-react-and-send-it-to-an-express-server
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post(
                `http://localhost:8080/users/${playerId}/profile-pic`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setProfilePic(result.data);
        } catch (e) {
            if (e.response?.status === 413) {
                setError(true);
                setErrorMsg("Bestand is groter dan 1MB. Kies een kleiner bestand.");
            } else {
                setError(true);
                setErrorMsg("Upload van profielfoto mislukt.");
            }
        }
    }

    async function handlePasswordChange(password) {
        try {
            await axios.patch(
                `http://localhost:8080/users/${playerId}/password`,
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (e) {
            setError(true);
            setErrorMsg(e.response?.data || "Wachtwoord kon niet worden aangepast.");
        }
    }

    async function onSubmit(data) {
        setError(false);

        if (data.password === "") {
            delete data.password;
        }

        try {
            await axios.put(`http://localhost:8080/users/${playerId}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.password) {
                await handlePasswordChange(data.password);
            }

            setAccountUpdated(true);
        } catch (e) {
            setError(true);
            setErrorMsg(e.response?.data || "Er is iets misgegaan, probeer het later opnieuw.");
        }
    }

    return (
        <div className="outer-container-excl-sponsor">
            <Header>Profiel bewerken</Header>
            <div className="page-content">
                {profilePic && <img src={profilePic} alt="Profielfoto"/>}
                <input
                    type="file"
                    accept="image/*"
                    onChange={function(e) { handleProfilePicUpload(e.target.files[0]); }}
                />
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
                            pattern: { value: /^\S+@\S+$/i, message: "Een email moet de volgende format hebben: example@email.com" }
                        }}
                        register={register}
                        errors={errors}
                    >
                        Email
                    </InputComponent>
                    <InputComponent
                        inputType="password"
                        inputName="password"
                        inputId="password-field"
                        validationRequired={false}
                        additionalValidation={{
                            minLength: { value: 8, message: "Wachtwoord moet minimaal 8 tekens zijn" },
                            maxLength: { value: 64, message: "Wachtwoord mag maximaal 64 tekens zijn" }
                        }}
                        register={register}
                        errors={errors}
                    >
                        Nieuw wachtwoord (optioneel)
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
                            maxLength: {value: 12, message: "Telefoonnummer mag maximaal 12 cijfers zijn"}
                        }}
                        register={register}
                        errors={errors}
                    >
                        Telefoonnummer
                    </InputComponent>
                    <Button type="submit">Opslaan</Button>
                    {accountUpdated && <p>Je profiel is succesvol bijgewerkt!</p>}
                </form>
            </div>
        </div>
    );
}


export default EditProfile;
