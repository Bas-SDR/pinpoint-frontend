import './Profile.css';
import profilePic from "../../assets/profile-pic-man1.png"
import TeamCard from "../../components/teamCard/TeamCard.jsx";
import PlayerCard from "../../components/playerCard/PlayerCard.jsx";
import StatsCard from "../../components/statsCard/StatsCard.jsx";

function Profile() {
    return (
        <>
            <h2>Profiel van</h2>
            <h1>Voornaam Achternaam</h1>{/*TODO Add first and last name from JWT token*/}
            <span className="image-container">
            <img src={profilePic} alt="photo of player"/>
            </span>
            <div className="team-collection">
                <div className="team">
                    <TeamCard
                        teamId="1"
                        teamName="Pinsanity"
                        teamPlayers="4"
                    />
                    <PlayerCard
                        competition="Monday 1"
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
                        competition="Tuesday 2"
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
                        competition="Wednesday 3"
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