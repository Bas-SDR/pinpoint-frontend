import React from "react";
import "./BigCard.css";
import noLogo from "../../assets/teamlogo/nologo.png";
import noImage from "../../assets/noimage.svg";
import {Link} from "react-router-dom";
import {CardType} from "../../constants/CardType.js";

const teamImages = import.meta.glob("../../assets/teamlogo/*.{png,jpg,jpeg,svg}", {eager: true});
const managementImages = import.meta.glob("../../assets/management/*.{png,jpg,jpeg,svg}", {eager: true});

function getTeamImage(id) {
    return teamImages[`../../assets/teamlogo/${id}.png`]?.default || null;
}

function getManagementImage(id) {
    return managementImages[`../../assets/management/${id}.svg`]?.default || null;
}

function BigCard({
                     type, // "management" | "team"
                     userId,
                     userName,
                     userFunction,
                     userEmail,
                     teamId,
                     teamName,
                     teamPlayers
                 }) {
    const imageSrc = type === "management"
        ? getManagementImage(userId) || noImage
        : getTeamImage(teamId) || noLogo;

    const linkTo = type === "management" ? `/profile/${userId}` : `/team/${teamId}`;

    if (!Object.values(CardType).includes(type)) {
        console.warn(`Invalid BigCard type: ${type}`);
        return null;
    }

    return (
        <div className={`${type}-card hover-effect`}>
            <Link to={linkTo}>
                <img
                    className={`${type}-logo`}
                    src={imageSrc}
                    alt={type === CardType.MANAGEMENT ? `${userName} picture` : `${teamName} logo`}
                />
            </Link>

            {type === CardType.MANAGEMENT && (
                <>
                    <h3>{userName}</h3>
                    <h4>Rol:</h4>
                    <p>{userFunction || "Geen functie beschikbaar"}</p>
                    <h4>E-mail:</h4>
                    <p>{userEmail || "Geen email beschikbaar"}</p>
                </>
            )}

            {type === CardType.TEAM && (
                <>
                    <h2>{teamName || "Geen team"}</h2>
                    {teamPlayers && <p>Spelers: {teamPlayers}</p>}
                </>
            )}
        </div>
    );
}

export default BigCard;
