import './TeamCard.css';

import React from "react";
import "./TeamCard.css";

const images = import.meta.glob("../../assets/teamlogo/*.{png,jpg,jpeg,svg}", { eager: true });

function getImageById(id) {
    return images[`../../assets/teamlogo/${id}.png`]?.default || null;
}

function TeamCard({ teamId, teamName, teamPlayers }) {
    const logoImage = getImageById(teamId);

    return (
        <div
            className="team-card"
        >
            {logoImage && (
                <img className="team-logo" src={logoImage} alt={`${teamName} logo`} />
            )}
            {teamName ? <h2>{teamName}</h2> : <h2>No team</h2>}
            {teamPlayers ? <p>Spelers: {teamPlayers}</p> : null}
        </div>
    );
}

export default TeamCard;