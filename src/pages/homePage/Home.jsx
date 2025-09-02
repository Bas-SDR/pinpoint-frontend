import './Home.css';
import Header from "../../components/header/Header.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import stockphoto from "../../../src/assets/stockphoto.jpg"
import NewsTile from "../../components/newsTile/NewsTile.jsx";

function Home() {
    return (
        <div className="outer-container-incl-sponsor">
            <Header>Home</Header>
            <div className="page-content homepage-styling">
                <NewsTile
                    tileImage={stockphoto}
                    imageAltTile="Stock photo"
                    tileTitle="Welkom"
                    tileType="clean-view"
                >
                    <p>Hier vind je info over Bowling Vereniging XXYYZZ, en de uitslagen van de gespeelde leagues en toernooien</p>
                </NewsTile>
            </div>
            <SponsorBar sponsorLocation="left"/>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default Home;