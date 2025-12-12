import './Profile.css';
import modifySymbol from "../../assets/modify-symbol.png"
import SmallCard from "../../components/smallCard/SmallCard.jsx";
import StatsCard from "../../components/statsCard/StatsCard.jsx";
import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import useProfileData from "../../hooks/useProfileData.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";
import getCurrentEntity from "../../helpers/getCurrentPageId.js";
import noImage from '../../assets/nologo.png';

function Profile() {

    const {isAuth, userId} = useContext(AuthContext);
    const {players, loading, error} = useProfileData();
    const {playerId} = useParams();
    const currentPlayer = getCurrentEntity(players, playerId, "id");
    const playerTeams = currentPlayer?.teams ?? [];

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>Profiel van</Header>
            }
            {players.length > 0 && <h1>{`${currentPlayer?.firstName} ${currentPlayer?.lastName}`}</h1>}
            <div className="inner-profile-container">
                <span className="profile-image-container">
                    <img
                        src={currentPlayer?.profilePicture ? `http://localhost:8080${currentPlayer.profilePicture}` : noImage}
                        alt="photo of player"
                    />
                </span>
                {isAuth && parseInt(playerId) === userId &&
                    <Link to={`/profile/${userId}/edit`} className="profile-modify-symbol">
                        <img src={modifySymbol} alt="wrench symbol"/>
                    </Link>
                }
            </div>
            <div className="team-collection">
                {playerTeams.length > 0 ? (
                    playerTeams.map(team => (
                        <div key={team.id} className="profile-team">
                            <BigCard
                                type="team"
                                teamId={team.id}
                                teamName={team.teamName}
                                teamPlayers={team.players?.length}
                                teamPic={team.teamPic}
                            />
                            <SmallCard
                                leagues={team.leagues}
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
                averagePinfall={currentPlayer?.stats?.averageScore}
                perfectGames={currentPlayer?.stats?.perfectGames}
            />

        </div>
    );
}

export default Profile;