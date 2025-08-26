import React from "react";
import "./TeamCard.css";
import noLogo from "../../assets/teamlogo/nologo.png";
import {Link} from "react-router-dom";

const images = import.meta.glob("../../assets/teamlogo/*.{png,jpg,jpeg,svg}", { eager: true });

function getImageById(id) {
    return images[`../../assets/teamlogo/${id}.png`]?.default || null;
}

function TeamCard({ teamId, teamName, teamPlayers }) {
    const logoImage = getImageById(teamId);

    return (
        <div className="team-card">
            {logoImage ?
                <Link to={`/team/${teamId}`}>
                <img className="team-logo" src={logoImage} alt={`${teamName} logo`} />
                </Link>
                :
                <img className="team-logo" src={noLogo} alt="No logo"/>}
            {teamName ? <h2>{teamName}</h2> : <h2>Geen team</h2>}
            {teamPlayers && <p>Spelers: {teamPlayers}</p>}
        </div>
    );
}

export default TeamCard;