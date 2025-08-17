import './Profile.css';
import profilePic from "../../assets/profile-pic-man1.png"
import modifySymbol from "../../assets/modify-symbol.png"
import TeamCard from "../../components/teamCard/TeamCard.jsx";
import PlayerCard from "../../components/playerCard/PlayerCard.jsx";
import StatsCard from "../../components/statsCard/StatsCard.jsx";
import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

function Profile() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <h2>Profiel van</h2>
            <h1>Voornaam Achternaam</h1>{/*TODO Add first and last name from JWT token*/}
            <div className="outer-profile-container">
                <div className="inner-profile-container">
                    <span className="image-container">
                    <img src={profilePic} alt="photo of player"/>
                    </span>
                    {isAuth &&
                        //     TODO Replace isAuth with username verification

                        <Link to={`/profile/${1}/edit`} className="modify-symbol">
                            <img src={modifySymbol} alt="wrench symbol"/>
                        </Link>
                    // TODO Replace profile ID with ID from database, and modify to logical link
                    }
                </div>
            </div>
            <div className="team-collection">
                {/*TODO Add mapping from database instead of hardcoded*/}
                <div className="team">
                    <TeamCard
                        teamId="1"
                        teamName="Pinsanity"
                        teamPlayers="4"
                    />
                    <PlayerCard
                        competition="Maandag 1"
                        ranking="1"
                        averageScore="150"
                    />
                </div>
                <div className="team">
                    <TeamCard
                        teamId="2"
                        teamName="Pin There, Done That"
                        teamPlayers="2"
                    />
                    <PlayerCard
                        competition="Dinsdag 2"
                        ranking="8"
                        averageScore="120"
                    />
                </div>
                <div className="team">
                    <TeamCard
                        teamId="3"
                        teamName="Spare Me"
                        teamPlayers="3"
                    />
                    <PlayerCard
                        competition="Woensdag 3"
                        ranking="4"
                        averageScore="170"
                    />
                </div>
                <div className="team">
                    <TeamCard
                        teamId=""
                        teamName=""
                        teamPlayers=""
                    />
                    <PlayerCard
                        competition=""
                        ranking=""
                        averageScore=""
                    />
                </div>
                <div className="team">
                    <TeamCard
                        teamId=""
                        teamName=""
                        teamPlayers=""
                    />
                    <PlayerCard
                        competition=""
                        ranking=""
                        averageScore=""
                    />
                </div>
            </div>
            <StatsCard
                highestGame="300"
                highestSeries="712"
                totalPinfall="23467"
                averagePinfall="522"
                perfectGames="3"
            />
        </>
    );
}

export default Profile;