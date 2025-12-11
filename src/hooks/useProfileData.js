import {useEffect, useState} from "react";
import axios from "axios";


function useProfileData() {
    const [teams, setTeams] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [players, setPlayers] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        toggleLoading(true);
        toggleError(false);

        async function fetchProfileData() {
            toggleError(false);
            try {
                const [
                    teamResult,
                    leagueResult,
                    playerResult,
                ]
                    = await Promise.all([
                    axios.get("http://localhost:8080/teams", {
                        signal: controller.signal,
                    }),
                    axios.get("http://localhost:8080/leagues", {
                        signal: controller.signal,
                    }),
                    axios.get("http://localhost:8080/players", {
                        signal: controller.signal,
                    }),
                ]);

                setTeams(teamResult.data);
                setLeagues(leagueResult.data);
                setPlayers(playerResult.data);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchProfileData();

        return function cleanup() {
            controller.abort();
        }

    }, []);

    return {teams, leagues, players, loading, error};
}

export default useProfileData;