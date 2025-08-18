import './Info.css';
import NameCard from "../../components/nameCard/NameCard.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";

function Info() {
    return (
        <div className="outer-container-incl-sponsor">
            <SponsorBar sponsorLocation="left"/>
            <h1>Vereniging XXYYZZ info</h1>
            <h2>Wij zijn vereniging XXYYZZ en onze speellocatie is Bowlinghuis AABBCC in Arnhem</h2>
                <article className="management-collection">
                    <NameCard
                        userId={1}
                        userName="Piet Jan"
                        userEmail="voorzitter@bowling.com"
                        userFunction="Voorzitter"
                    />
                    <NameCard
                        userId={2}
                        userName="Piet Jan"
                        userEmail="penningmeester@bowling.com"
                        userFunction="Penningmeester"
                    />
                    <NameCard
                        userId={3}
                        userName="Piet Jan"
                        userEmail="11@bowling.com"
                        userFunction="Functie 11"
                    />
                    <NameCard
                        userId={4}
                        userName="Piet Jan"
                        userEmail="22@bowling.com"
                        userFunction="Functie 22"
                    />
                    <NameCard
                        userId={5}
                        userName="Piet Jan"
                        userEmail="33@bowling.com"
                        userFunction="Functie 33"
                    />
                    <NameCard
                        userId={6}
                        userName="Piet Jan"
                        userEmail="44@bowling.com"
                        userFunction="Functie 44"
                    />
                    <NameCard
                        userId={7}
                        userName="Piet Jan"
                        userEmail="55@bowling.com"
                        userFunction="Functie 55"
                    />
                    <NameCard
                        userId={8}
                        userName="Piet Jan"
                        userEmail="66@bowling.com"
                        userFunction="Functie 66"
                    />
                    <NameCard
                        userId=""
                        userName=""
                        userEmail=""
                        userFunction=""
                    />
                </article>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default Info;