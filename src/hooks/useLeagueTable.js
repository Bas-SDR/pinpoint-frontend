import {useMemo} from "react";

function useLeagueTables(currentLeague, teams, players) {

    const teamsForTable = useMemo(() => {
        if (!currentLeague) return [];

        const leagueTeamsInCurrentLeague = currentLeague.leagueTeams;

        return leagueTeamsInCurrentLeague.map((leagueTeam, index) => {
            const team = teams.find((singleTeam) => singleTeam.id === leagueTeam.id);

            const teamName = team?.teamName ?? "Onbekende team";

            const playersInTeam = players.filter((player) =>
                player.teams?.find(
                    (playerTeam) =>
                        playerTeam.id === leagueTeam.id &&
                        playerTeam.leagues?.find(
                            (league) => league.id === currentLeague.id
                        )
                )
            );

            const playerNames = playersInTeam.map(
                (player) => `${player.firstName} ${player.lastName}`
            );

            return {
                teamId: team?.id,
                teamName,
                players: playerNames.join(", "),
                teamSize: playerNames.length,
                position: index + 1, //TODO Placeholder, stats for teams / league needed to create position.
            };
        });
    }, [currentLeague, teams, players]);



    const playersForTable = useMemo(() => {
        if (!currentLeague) return [];

        return players
            .map((player) => {
                const playerTeamsInLeague = player.teams?.filter((team) =>
                    team.leagues?.find(
                        (league) => league.id === currentLeague.id
                    )
                );

                if (!playerTeamsInLeague || playerTeamsInLeague.length === 0)
                    return null;

                const teamNames = playerTeamsInLeague
                    .map((team) => team.teamName)
                    .filter(Boolean);

                return {
                    playerId: player.id,
                    fullName: `${player.firstName} ${player.lastName}`,
                    averageScore: player.stats?.averageScore ?? 0,
                    highestGame: player.stats?.highestGame ?? 0,
                    highestSeries: player.stats?.highestSeries ?? 0,
                    perfectGames: player.stats?.perfectGames ?? 0,
                    totalPinfall: player.stats?.totalPinfall ?? 0,
                    teams: teamNames.join(", "),
                };
            })
            .filter(Boolean);
    }, [currentLeague, players]);

    return { teamsForTable, playersForTable };
}

export default useLeagueTables;