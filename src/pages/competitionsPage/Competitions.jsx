import './Competitions.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/header/Header.jsx";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import useProfileData from "../../hooks/useProfileData.js";
import {useParams} from "react-router-dom";

function Competitions() {

    const {leagues, loading, error} = useProfileData();

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>Competities</Header>
            }
            <div className="team-collection">
                {leagues.length > 0 ? leagues.map((league) => {
                        const firstPlace = league.teams?.find(team => team.position === "1st");

                        return (
                            <article key={league?.leagueId}>
                                    <BigCard
                                        leagueId={league?.leagueId}
                                        type="league"
                                        leagueName={league?.leagueName}
                                        leagueMembers={league?.teams?.length}
                                        leagueFirst={firstPlace.teamName}
                                    />
                            </article>
                        );
                    })
                    : (
                        <p>Er zijn geen competities beschikbaar</p>
                    )}
            </div>
        </div>
    );
}

export default Competitions;