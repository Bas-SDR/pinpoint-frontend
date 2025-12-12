import React from "react";
import "./BigCard.css";
import noLogo from "../../assets/nologo.png";
import noImage from "../../assets/noimage.svg";
import {Link} from "react-router-dom";
import {CardType} from "../../constants/CardType.js";

const managementImages = import.meta.glob("../../assets/management/*.{png,jpg,jpeg,svg}", {eager: true});
const leagueImages = import.meta.glob("../../assets/league/*.{png,jpg,jpeg,svg}", {eager: true});


function getManagementImage(id) {
    return managementImages[`../../assets/management/${id}.svg`]?.default || null;
}

function getLeagueImage(id) {
    return leagueImages[`../../assets/league/${id}.svg`]?.default || null;
}

function BigCard({
                     type, // "management" | "team"
                     userId,
                     userName,
                     userFunction,
                     userEmail,
                     teamId,
                     teamName,
                     teamPlayers,
                     teamPic,
                     leagueId,
                     leagueName,
                     leagueMembers,
                     leagueFirst,
                 }) {

    let imageSrc = "";
    let linkTo = "";
    let imgAlt = "";

    switch (type) {
        case CardType.MANAGEMENT:
            imageSrc = getManagementImage(userId) || noImage;
            linkTo = `/profile/${userId}`;
            imgAlt = userName ? `${userName} picture` : "Management picture"
            break;
        case CardType.TEAM:
            imageSrc = teamId && teamPic ? `http://localhost:8080${teamPic}` : noLogo;
            linkTo = `/team/${teamId}`;
            imgAlt = teamName ? `${teamName} logo` : "Team logo";
            break;
        case CardType.LEAGUE:
            imageSrc = getLeagueImage(leagueId) || noLogo;
            linkTo = `/competitions/${leagueId}`;
            imgAlt = leagueName ? `${leagueName} logo` : "League logo";
            break;
        default:
            console.warn("Invalid BigCard type: ${type}");
            return null;
    }

    return (
        <div className={`${type}-card hover-effect`}>
            <Link to={linkTo}>
                <img
                    className={`${type}-logo`}
                    src={imageSrc}
                    alt={imgAlt}
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

            {type === CardType.LEAGUE && (
                <>
                    <h2>{leagueName}</h2>
                    <p>Teams: {leagueMembers}</p>
                    <p>Eerste plaats: {leagueFirst || "Geen informatie beschikbaar"}</p>

                </>
            )}
        </div>
    );
}

export default BigCard;
