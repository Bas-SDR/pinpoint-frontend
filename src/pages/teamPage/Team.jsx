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
    const [searchFirstName, setSearchFirstName] = useState("");
    const [searchLastName, setSearchLastName] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const token = localStorage.getItem("token");
    const currentTeam = getCurrentEntity(teams, teamId, "id");

    async function kickPlayer(player) {
        //https://www.geeksforgeeks.org/javascript/javascript-window-confirm-method/
        let result = confirm(
            `Weet je zeker dat je ${player.firstName} ${player.lastName} uit het team wilt verwijderen?`
        );

        if (!result) return;

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
        let result = confirm(
            "Weet je zeker dat je uit het team wilt stappen?"
        );

        if (!result) return;

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

    async function promoteToCaptain(player) {
        let result = confirm(
            `Weet je zeker dat je ${player.firstName} ${player.lastName} captain wilt maken?`
        );

        if (!result) return

        try {
            await axios.patch(
                `http://localhost:8080/teams/${currentTeam.id}`,
                {captainId: player.id},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setSuccessMsg(`Speler ${player.firstName} ${player.lastName} is succesvol captain gemaakt`);
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMsg("Captain maken mislukt.");
        }
    }

    async function searchUsers() {
        setError(false);
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const response = await axios.get("http://localhost:8080/users/search", {
                params: {
                    firstName: searchFirstName.trim() || null,
                    lastName: searchLastName.trim() || null
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            setSearchResults(response.data);
        } catch (e) {
            console.error(e);
            setError(true);
            setErrorMsg("Zoeken mislukt.");
        }
    }

    async function addPlayer(userId) {
        setError(false);
        setErrorMsg("");
        setSuccessMsg("");
        try {
            const response = await axios.post(
                `http://localhost:8080/teams/${currentTeam.id}/addplayer/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMsg(`Speler ${response.data.playerFirstName} ${response.data.playerLastName} toegevoegd aan team ${response.data.teamName}`);
            setSearchResults([]);

        } catch (e) {
            console.error(e);
            setErrorMsg(e.response.data);
            setError(true);
        }

    }

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>
                    Team {teams.find(team => team?.id === Number(teamId))?.teamName ?? "Niet beschikbaar"}
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
            <div className="team-collection team-page">
                {currentTeam ? (
                    players
                        .filter(player => player.teams.find(team => team.id === currentTeam.id))
                        .map(player => (
                            <div className="team-card-container" key={player.id}>
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
                                <div className="button-container">
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
                                    {(roles.includes("ROLE_ADMIN") || currentTeam.captainId === userId) && (
                                        <Button
                                            onClick={() => promoteToCaptain(player)}
                                        >
                                            Maak captain
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                ) : (
                    <h2>Geen teams gevonden</h2>
                )}
            </div>
            {(roles?.includes("ROLE_ADMIN") || currentTeam?.captainId === userId) && (
            <div>
                <h3>Search and Add Player</h3>
                <input
                    type="text"
                    placeholder="First name"
                    value={searchFirstName}
                    onChange={e => setSearchFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last name"
                    value={searchLastName}
                    onChange={e => setSearchLastName(e.target.value)}
                />
                <Button onClick={searchUsers}>Zoeken</Button>

                {searchResults.length > 0 ? (
                    <div className="search-results">
                        {searchResults.map(user => (
                            <div key={user.id}>
                                {user.firstName} {user.lastName}
                                <Button onClick={() => addPlayer(user.id)}>Add</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Geen spelers gevonden.</p>
                )}
            </div>
            )}
        </div>
    );
}

export default Team;