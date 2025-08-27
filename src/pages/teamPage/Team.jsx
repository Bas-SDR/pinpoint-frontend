import './Team.css';
import Header from "../../components/header/Header.jsx";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import useProfileData from "../../hooks/useProfileData.js";
import {useParams} from "react-router-dom";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import NameCard from "../../components/nameCard/NameCard.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";

const images = import.meta.glob("../../assets/teamlogo/*.{png,jpg,jpeg,svg}", { eager: true });

function getImageById(id) {
    return images[`../../assets/teamlogo/${id}.png`]?.default || null;
}

function Team() {
    const {isAuth, userId} = useContext(AuthContext);
    const {teams, leagues, players, loading, error} = useProfileData();
    const {teamId} = useParams();
    const logoImage = getImageById(teamId);

    console.log(players);
    console.log(teams);
    console.log(leagues);
    console.log(teams[0]?.teamPlayers[0]?.role)

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>
                    Team {teams.find(team => team?.teamId === Number(teamId))?.teamName ?? "Not found"}
                </Header>
            }
            <img className="team-logo" src={logoImage} alt={`${teams[teamId]?.teamName} logo`} />
            <NameCard
            userId={players[0]?.playerId}
            userName={`${players[0]?.firstName} ${players[0]?.lastName}`}
            userFunction={teams[0]?.teamPlayers[0]?.role}
            userEmail="To follow"
            >
            </NameCard>
            <SmallCard
            // competition={leagues[1].leagueName}
            // ranking={}
            // averageScore={}
            >
            </SmallCard>
            <h2>Spelers</h2>


        </div>
    );
}

export default Team;