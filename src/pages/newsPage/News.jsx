import './News.css';
import InfoTile from "../../components/infoTile/InfoTile.jsx";
import newsArt1 from "../../../public/News/NewsArt1.svg";
import newsArt2 from "../../../public/News/NewsArt2.svg";
import newsArt3 from "../../../public/News/NewsArt3.svg";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function News() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        // const controller = new AbortController();
        toggleLoading(true);

        async function fetchNews() {

            toggleError(false);
            try {
                const result = await axios.get("news.json", {
                    // signal: controller.signal,
                });
                setNewsArticles(result.data.news);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchNews();
        // return function cleanUp() {
        //     controller.abort();
        // }

    }, []);


    return (
        <div className="outer-container-incl-sponsor">
            <SponsorBar sponsorLocation="left"/>
            <h1>Laatste nieuws</h1>
            {newsArticles.map((newsArticle) => {
                const baseOrientation = newsArticle.id % 2 === 0 ? "left" : "right";
                return (
                    <article key={newsArticle.id} className={`news-article ${baseOrientation}`}>
                        {newsArticle.content.map((content, tileIndex) => (
                            <InfoTile
                                key={tileIndex}
                                tileTitle={content.tileType === "text" ? content.title : undefined}
                                tileImage={content.tileType === "image" ? content.image.src : undefined}
                                imageAltTile={content.tileType === "image" ? content.image.alt : undefined}
                                tileType={content.tileType}
                            >
                                {content.tileType === "text" && content.paragraphs.map((paragraph, i) =>
                                    <p key={i}>{paragraph}</p>
                                )}
                            </InfoTile>
                        ))}
                        {newsArticle.length === 0 && loading && <p>Nieuws wordt geladen...</p>}
                        {newsArticle.length === 0 && error && <p>Er is geen nieuws beschikbaar</p>}
                    </article>
                );

            })}
            <SponsorBar sponsorLocation="right"/>
        </div>
    );

    // );
    // <article className="news-article">
    //     <InfoTile tileTitle={"Seizoen voorbij!"} tileOrientation="left" tileType="text">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur dignissimos dolores
    //             nam nisi optio rem sapiente ullam, vero! Accusamus aliquid culpa cumque cupiditate et hic magnam
    //             magni odit voluptates!</p>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut doloremque eligendi error
    //             et eveniet, impedit ipsam iure optio quae reiciendis sed sit sunt tempore!</p>
    //     </InfoTile>
    //     <InfoTile tileImage={newsArt1} imageAltTile={"News Article 1"} tileOrientation="left" tileType="image"/>
    // </article>
    // <article className="news-article">
    //     <InfoTile tileImage={newsArt2} imageAltTile={"News Article 2"} tileOrientation="right"
    //               tileType="image"/>
    //     <InfoTile tileTitle={"Finale dag volgende week"} tileOrientation="right" tileType="text">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda, beatae debitis
    //             deserunt doloremque doloribus dolorum, eum hic iure minus officiis pariatur quaerat, quo ratione
    //             rem sunt voluptatem? Libero neque nostrum numquam quibusdam quod repellendus, totam voluptatibus
    //             voluptatum. Labore, obcaecati! </p>
    //     </InfoTile>
    // </article>
    // <article className="news-article">
    //     <InfoTile tileTitle={"Laatste competitie dagen"} tileOrientation="left" tileType="text">
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur dignissimos dolores
    //             nam nisi optio rem sapiente ullam, vero! Accusamus aliquid culpa cumque cupiditate et hic magnam
    //             magni odit voluptates!</p>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut doloremque eligendi error
    //             et eveniet, impedit ipsam iure optio quae reiciendis sed sit sunt tempore!</p>
    //     </InfoTile>
    //     <InfoTile tileImage={newsArt3} imageAltTile={"News Article 3"} tileOrientation="left" tileType="image"/>
    // </article>

}

export default News;