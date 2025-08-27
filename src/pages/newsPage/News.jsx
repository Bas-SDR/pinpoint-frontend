import './News.css';
import NewsTile from "../../components/infoTile/NewsTile.jsx";
import SponsorBar from "../../components/sponsorBar/SponsorBar.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/header/Header.jsx";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";

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
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>Laatste Nieuws</Header>
            }
            {newsArticles.map((newsArticle, index) => {

                const baseOrientation = index % 2 === 0 ? "left" : "right";
                return (
                    <article key={newsArticle.id} className={`news-article ${baseOrientation}`}>
                        {newsArticle.content.map((content, tileIndex) => (
                            <NewsTile
                                key={tileIndex}
                                tileTitle={content.tileType === "text" ? content.title : undefined}
                                tileImage={content.tileType === "image" ? content.image.src : undefined}
                                imageAltTile={content.tileType === "image" ? content.image.alt : undefined}
                                tileType={content.tileType}
                            >
                                {content.tileType === "text" && content.paragraphs.map((paragraph, i) =>
                                    <p key={i}>{paragraph}</p>
                                )}
                            </NewsTile>
                        ))}
                    </article>
                );
            })}
            <SponsorBar sponsorLocation="right"/>
        </div>
    );
}

export default News;