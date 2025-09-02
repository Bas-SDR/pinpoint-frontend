import './Home.css';
import Header from "../../components/header/Header.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import stockphoto from "../../../src/assets/stockphoto.jpg"
import InfoTile from "../../components/infoTile/InfoTile.jsx";

function Home() {
    return (
        <div className="outer-container-incl-sponsor">
            <Header>Home</Header>
            <div className="page-content homepage-styling">
                <InfoTile
                    tileImage={stockphoto}
                    imageAltTile="Stock photo"
                    tileTitle="Welkom"
                    tileType="clean-view"
                >
                    <p>Hier vind je info over Bowling Vereniging XXYYZZ, en de uitslagen van de gespeelde leagues en toernooien</p>
                </InfoTile>
            </div>
            <SponsorBar sponsorLocation="left"/>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default Home;