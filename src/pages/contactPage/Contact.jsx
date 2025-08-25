import './Contact.css';
import Header from "../../components/header/Header.jsx";
import {useState} from "react";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import Button from "../../components/button/Button.jsx";
import {NavLink} from "react-router-dom";

function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [comments, setComments] = useState("");
    const [privacy, setPrivacy] = useState(false);
    const isFormValid =
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        phone.trim() &&
        subject.trim() &&
        comments.trim();

    function handleSubmit(e) {
        e.preventDefault();
        return console.log({firstName, lastName, phone, email, subject, comments, privacy})
    //     TODO Change this to submit it to the backend instead of console.
    }

    return (
        <div className="outer-container-incl-sponsor">
            <SponsorBar sponsorLocation="left"/>
            <Header>Contact</Header>
            <br/>
            <h3>Neem via onderstaand formulier contact met ons op</h3>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend><h2>Gegevens</h2></legend>
                    <div className="field-row">
                        <label htmlFor="first-name-details">
                            Voornaam:
                            <input
                                type="text"
                                id="first-name-details"
                                name="name"
                                placeholder=""
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label htmlFor="last-name-details">
                            Achternaam:
                            <input
                                type="text"
                                id="last-name-details"
                                name="name"
                                placeholder=""
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                    </div>
                    <label htmlFor="email-details">
                        Email:
                        <input
                            type="email"
                            id="email-details"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="phone-details">
                        Telefoon nummer:
                        <input
                            type="tel"
                            id="phone-details"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend><h2>Jouw review</h2></legend>
                    <label htmlFor="form-subject">
                        Onderwerp:
                        <textarea
                            id="form-subject"
                            name="form-subject"
                            placeholder=""
                            rows="1"
                            cols="40"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </label>
                    <label htmlFor="form-comments">
                        Opmerkingen:
                        <textarea
                            id="form-comments"
                            name="form-comments"
                            placeholder="Typ hier uw bericht"
                            rows="10"
                            cols="40"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </label>
                    <label htmlFor="privacy-checkbox" className="checkbox-label">
                        <input
                            type="checkbox"
                            id="privacy-checkbox"
                            name="privacy-checkbox"
                            checked={privacy}
                            onChange={() => setPrivacy(!privacy)}
                        />
                        Ik ga akkoord met het <NavLink to="/privacy">Privacy  beleid</NavLink>
                    </label>
                    <Button
                        type="submit"
                        disabled={!isFormValid}
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