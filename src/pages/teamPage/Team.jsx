import './Team.css';
import Header from "../../components/header/Header.jsx";
import React from "react";
import useProfileData from "../../hooks/useProfileData.js";
import {useParams} from "react-router-dom";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";
import getCurrentEntity from "../../helpers/getCurrentPageId.js";
import noLogo from '../../assets/nologo.png';

function Team() {
    const {teams, players, loading, error} = useProfileData();
    const {teamId} = useParams();
    const currentTeam = getCurrentEntity(teams, teamId, "id");

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
                                    userFunction="Member"
                                    userEmail="To follow"
                                />
                                <SmallCard
                                    averageScore={player.stats.averageScore}
                                    highestGame={player.stats.highestGame}
                                    highestSeries={player.stats.highestSeries}
                                />
                            </div>
                        ))
                ) : (
                    <h2>No teams have been found</h2>
                )}
            </div>
        </div>
    );
}

export default Team;