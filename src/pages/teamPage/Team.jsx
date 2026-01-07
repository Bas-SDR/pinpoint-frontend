import './Team.css';
import Header from "../../components/header/Header.jsx";
import React, {useContext, useState} from "react";
import useProfileData from "../../hooks/useProfileData.js";
import {useParams} from "react-router-dom";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";
import getCurrentEntity from "../../helpers/getCurrentPageId.js";
import noLogo from '../../assets/nologo.png';
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function Team() {
    const {teams, players, loading, error} = useProfileData();
    const {teamId} = useParams();
    const {userId, roles} = useContext(AuthContext);

    const [errorState, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const token = localStorage.getItem("token");
    const currentTeam = getCurrentEntity(teams, teamId, "id");

    async function kickPlayer(player) {
        setError(false);
        setErrorMsg("");
        setSuccessMsg("");
        try {
            await axios.patch(
                `http://localhost:8080/teams/${currentTeam.id}/kick/${player.id}`,
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setSuccessMsg(`${player.firstName} ${player.lastName} is succesvol verwijderd.`);
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMsg("Kick mislukt.");
        }
    }

    async function leaveTeam(player) {
        try {
            await axios.patch(
                `http://localhost:8080/teams/${currentTeam.id}/leave/${player.id}`,
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setSuccessMsg(`Je hebt succesvol het team verlaten.`);
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMsg("Team verlaten mislukt.");
        }
    }

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>
                    Team {teams.find(team => team?.id === Number(teamId))?.teamName ?? "Not found"}
                </Header>
            }
            {
                <img
                    className="team-logo"
                    src={currentTeam?.teamPic ? `http://localhost:8080${currentTeam.teamPic}` : noLogo}
                    alt={`${currentTeam?.teamName ?? 'Team'} logo`}
                />
            }
            <h2>Spelers</h2>
            {successMsg && <p className="success-message">{successMsg}</p>}
            {errorState && <p className="error-message">{errorMsg}</p>}
            <div className="team-collection">
                {currentTeam ? (
                    players
                        .filter(player => player.teams.find(team => team.id === currentTeam.id))
                        .map(player => (
                            <div key={player.id}>
                                <BigCard
                                    type="management"
                                    userId={player.id}
                                    userName={`${player.firstName} ${player.lastName}`}
                                    userFunction={currentTeam?.captainId === player.id ? "Captain" : "Speler"}
                                    userEmail="To follow"
                                />
                                <SmallCard
                                    averageScore={player.stats.averageScore}
                                    highestGame={player.stats.highestGame}
                                    highestSeries={player.stats.highestSeries}
                                />
                                {player.id === userId && (
                                        <Button
                                            onClick={() => leaveTeam(player)}
                                        >
                                            Verlaat team
                                        </Button>
                                )}

                                {(roles.includes("ROLE_ADMIN") || currentTeam.captainId === userId) && (
                                        <Button
                                            onClick={() => kickPlayer(player)}
                                        >
                                            Kick speler
                                        </Button>
                                )}
                            </div>
                        ))
                ) : (
                    <h2>Geen teams gevonden</h2>
                )}
            </div>
        </div>
    );
}

export default Team;