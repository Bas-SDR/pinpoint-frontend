import './News.css';
import InfoTile from "../../components/infoTile/InfoTile.jsx";
import newsArt1 from "../../assets/News/NewsArt1.svg";
import newsArt2 from "../../assets/News/NewsArt2.svg";
import newsArt3 from "../../assets/News/NewsArt3.svg";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";

function News() {
    return (
        <div className="outer-container-incl-sponsor">
            <SponsorBar sponsorLocation="left"/>

            <article className="news-article">
                <InfoTile tileTitle={"Seizoen voorbij!"} tileOrientation="left" tileType="text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur dignissimos dolores
                        nam nisi optio rem sapiente ullam, vero! Accusamus aliquid culpa cumque cupiditate et hic magnam
                        magni odit voluptates!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut doloremque eligendi error
                        et eveniet, impedit ipsam iure optio quae reiciendis sed sit sunt tempore!</p>
                </InfoTile>
                <InfoTile tileImage={newsArt1} imageAltTile={"News Article 1"} tileOrientation="left" tileType="image"/>
            </article>
            <article className="news-article">
                <InfoTile tileImage={newsArt2} imageAltTile={"News Article 2"} tileOrientation="right" tileType="image"/>
                <InfoTile tileTitle={"Finale dag volgende week"} tileOrientation="right" tileType="text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur dignissimos dolores
                        nam nisi optio rem sapiente ullam, vero! Accusamus aliquid culpa cumque cupiditate et hic magnam
                        magni odit voluptates!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut doloremque eligendi error
                        et eveniet, impedit ipsam iure optio quae reiciendis sed sit sunt tempore!</p>
                </InfoTile>
            </article>
            <article className="news-article">
                <InfoTile tileTitle={"Laatste competitie dagen"} tileOrientation="left" tileType="text">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur dignissimos dolores
                        nam nisi optio rem sapiente ullam, vero! Accusamus aliquid culpa cumque cupiditate et hic magnam
                        magni odit voluptates!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut doloremque eligendi error
                        et eveniet, impedit ipsam iure optio quae reiciendis sed sit sunt tempore!</p>
                </InfoTile>
                <InfoTile tileImage={newsArt3} imageAltTile={"News Article 3"} tileOrientation="left" tileType="image"/>
            </article>
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default News;