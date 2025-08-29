import './Info.css';
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import Header from "../../components/header/Header.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";

function Info() {
    return (
        <div className="outer-container-incl-sponsor">
            <SponsorBar sponsorLocation="left"/>
            <Header>Info over de vereniging</Header>
            <h1>Vereniging XXYYZZ info</h1>
            <h2>Wij zijn vereniging XXYYZZ en onze speellocatie is Bowlinghuis AABBCC in Arnhem</h2>
                <article className="management-collection">
                    <BigCard
                        type="management"
                        userId={1}
                        userName="Piet Jan"
                        userEmail="voorzitter@bowling.com"
                        userFunction="Voorzitter"
                    />
                    <BigCard
                        type="management"
                        userId={2}
                        userName="Piet Jan"
                        userEmail="penningmeester@bowling.com"
                        userFunction="Penningmeester"
                    />
                    <BigCard
                        type="management"
                        userId={3}
                        userName="Piet Jan"
                        userEmail="11@bowling.com"
                        userFunction="Functie 11"
                    />
                    <BigCard
                        type="management"
                        userId={4}
                        userName="Piet Jan"
                        userEmail="22@bowling.com"
                        userFunction="Functie 22"
                    />
                    <BigCard
                        type="management"
                        userId={5}
                        userName="Piet Jan"
                        userEmail="33@bowling.com"
                        userFunction="Functie 33"
                    />
                    <BigCard
                        type="management"
                        userId={6}
                        userName="Piet Jan"
                        userEmail="44@bowling.com"
                        userFunction="Functie 44"
                    />
                    <BigCard
                        type="management"
                        userId={7}
                        userName="Piet Jan"
                        userEmail="55@bowling.com"
                        userFunction="Functie 55"
                    />
                    <BigCard
                        type="management"
                        userId={8}
                        userName="Piet Jan"
                        userEmail="66@bowling.com"
                        userFunction="Functie 66"
                    />
                    <BigCard
                        type="management"
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