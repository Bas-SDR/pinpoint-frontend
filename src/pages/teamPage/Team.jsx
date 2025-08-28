import './Team.css';
import Header from "../../components/header/Header.jsx";
import React from "react";
import useProfileData from "../../hooks/useProfileData.js";
import {useParams} from "react-router-dom";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";

const images = import.meta.glob("../../assets/teamlogo/*.{png,jpg,jpeg,svg}", {eager: true});

function getImageById(id) {
    return images[`../../assets/teamlogo/${id}.png`]?.default || null;
}

function Team() {
    const {teams, leagues, players, loading, error} = useProfileData();
    const {teamId} = useParams();
    const logoImage = getImageById(teamId);
    const currentTeam = teams.find(team => team.teamId === Number(teamId));

    console.log(currentTeam)

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>
                    Team {teams.find(team => team?.teamId === Number(teamId))?.teamName ?? "Not found"}
                </Header>
            }
            <img className="team-logo" src={logoImage} alt={`${teams[teamId]?.teamName} logo`}/>
            <h2>Spelers</h2>


            <div className="team-collection">
                {currentTeam ? (
                    currentTeam.teamPlayers.map((teamPlayer) => {
                        const player = players.find((player) => player.playerId === teamPlayer.id);

                        return (
                            <div key={player?.playerId}>
                                <BigCard
                                    type="management"
                                    userId={player?.playerId}
                                    userName={`${player?.firstName} ${player?.lastName}`}
                                    userFunction={teamPlayer.role}
                                    userEmail="To follow"
                                />
                                <SmallCard
                                    competition={leagues[1]?.leagueName}
                                    averageScore={player?.stats.averagePinfall}
                                    highestGame={player?.stats.highestGame}
                                    highestSeries={player?.stats.highestSeries}
                                />
                            </div>
                        );
                    })
                ) : (
                    <h2>No teams have been found</h2>
                )}
                <BigCard
                    type="management"
                    userId={players[0]?.playerId}
                    userName={`${players[0]?.firstName} ${players[0]?.lastName}`}
                    userFunction={teams[0]?.teamPlayers[0]?.role}
                    userEmail="To follow"
                />
                <SmallCard
                    competition={leagues[1]?.leagueName}
                    averageScore={players[0]?.stats?.averagePinfall}
                    highestGame={players[0]?.stats?.highestGame}
                    highestSeries={players[0]?.stats?.highestSeries}
                />
            </div>

        </div>
    );
}

export default Team;