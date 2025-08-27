import './Profile.css';
import profilePic from "../../assets/profile-pic-man1.png"
import modifySymbol from "../../assets/modify-symbol.png"
import TeamCard from "../../components/teamCard/TeamCard.jsx";
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import StatsCard from "../../components/statsCard/StatsCard.jsx";
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import useProfileData from "../../hooks/useProfileData.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
// import axios from "axios";

function Profile() {

    const {isAuth, userId} = useContext(AuthContext);
    const { teams, leagues, players, loading, error } = useProfileData();
    const currentPlayer = players.find(p => p.playerId === userId);
    // TODO Change this to check link (profile/1) in order to set the userID.
    const playerTeams = currentPlayer ? teams.filter(team => currentPlayer.teamIds.includes(team.teamId)) : [];

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>Profiel van</Header>
            }
            {players.length > 0 && <h1>{`${players[userId - 1].firstName} ${players[userId - 1].lastName}`}</h1>}
            {/*TODO Add first and last name from profile page id number*/}
            <div className="inner-profile-container">
                    <span className="image-container">
                    <img src={profilePic} alt="photo of player"/>
                    </span>
                {isAuth &&
                    //     TODO Replace isAuth with username verification from JWT token

                    <Link to={`/profile/user/${userId}/edit`} className="modify-symbol">
                        <img src={modifySymbol} alt="wrench symbol"/>
                    </Link>
                    // TODO Replace profile ID with ID from database, and modify to logical link
                }
            </div>
            <div className="team-collection">
                {playerTeams.length > 0 ? (
                    playerTeams.map(team => (
                        <div key={team.teamId} className="team">
                            <TeamCard
                                teamId={team.teamId}
                                teamName={team.teamName}
                                teamPlayers={team.teamPlayers.length}
                            />
                            <SmallCard
                                competition="Maandag 1"
                                ranking={team.ranking}
                                averageScore={currentPlayer.averageScore}
                            />
                        </div>
                    ))
                ) : (
                    <h3>Deze speler is geen lid van een team.</h3>
                )}
            </div>
    <StatsCard
        highestGame={currentPlayer?.stats?.highestGame}
        highestSeries={currentPlayer?.stats?.highestSeries}
        totalPinfall={currentPlayer?.stats?.totalPinfall}
        averagePinfall={currentPlayer?.stats?.averagePinfall}
        perfectGames={currentPlayer?.stats?.perfectGames}
    />

</div>
);
}

export default Profile;