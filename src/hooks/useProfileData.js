import {useEffect, useState} from "react";
import axios from "axios";


function useProfileData() {
    const [teams, setTeams] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [players, setPlayers] = useState([]);
    const [leagueTeams, setLeagueTeams] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        // const controller = new AbortController();
        //TODO Turn on controller once done with rest. Strictmode in main results in error.
        toggleLoading(true);
        toggleError(false);

        async function fetchProfileData() {
            toggleError(false);
            try {
                const [teamResult, leagueResult, playerResult, leagueTeamsResult, teamPlayersResult,] = await Promise.all([
                    axios.get("/teams.json", {
                         // signal: controller.signal,
                    }),
                    axios.get("/leagues.json", {
                         // signal: controller.signal,
                    }),
                    axios.get("/players.json", {
                         // signal: controller.signal,
                    }),
                    axios.get("/leagueTeams.json", {
                        // signal: controller.signal,
                    }),
                    axios.get("/teamPlayers.json", {
                        // signal: controller.signal,
                    }),
                ]);

                setTeams(teamResult.data);
                setLeagues(leagueResult.data);
                setPlayers(playerResult.data);
                setLeagueTeams(leagueTeamsResult.data);
                setTeamPlayers(teamPlayersResult.data);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchProfileData();

        // return function cleanup() {
        //     controller.abort();
        // }

    }, []);

    return { teams, leagues, players, leagueTeams, teamPlayers, loading, error };
}

export default useProfileData;