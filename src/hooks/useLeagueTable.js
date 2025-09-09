import {useMemo} from "react";

function useLeagueTables(currentLeague, teams, players, leagueTeams, teamPlayers) {

    const teamsForTable = useMemo(() => {
        if (!currentLeague) return [];

        const leagueTeamsInCurrentLeague = leagueTeams.filter(
            (leagueTeam) => leagueTeam.leagueId === currentLeague.leagueId
        );

        return leagueTeamsInCurrentLeague.map((leagueTeam) => {
            const team = teams.find((singleTeam) => singleTeam.teamId === leagueTeam.teamId);
            const teamName = team?.teamName ?? "Onbekende team";

            const playersInTeam = teamPlayers.filter(
                (teamPlayer) => teamPlayer.teamId === leagueTeam.teamId
            );

            const playerNames = playersInTeam.map((teamPlayer) => {
                const player = players.find((singlePlayer) => singlePlayer.playerId === teamPlayer.playerId);
                return player ? `${player.firstName} ${player.lastName}` : "Onbekende speler";
            });

            const leagueTeamData = currentLeague.teams.find(
                (leagueTeamEntry) => leagueTeamEntry.teamId === leagueTeam.teamId
            );
            const position = leagueTeamData?.position ?? "Onbekend";

            return {
                teamId: team?.teamId,
                teamName,
                players: playerNames.join(", "),
                teamSize: playerNames.length,
                position,
            };
        });
    }, [currentLeague, leagueTeams, teams, teamPlayers, players]);


    const playersForTable = useMemo(() => {
        if (!currentLeague) return [];

        const teamIdsInCurrentLeague = leagueTeams
            .filter((leagueTeam) => leagueTeam.leagueId === currentLeague.leagueId)
            .map((leagueTeam) => leagueTeam.teamId);

        const tableData = players.map((player) => {
            const playerTeamsInLeague = teamPlayers.filter(
                (teamPlayer) => teamPlayer.playerId === player.playerId && teamIdsInCurrentLeague.includes(teamPlayer.teamId)
            );

            if (playerTeamsInLeague.length === 0) return null;

            const teamNames = playerTeamsInLeague.map((teamPlayer) => {
                const team = teams.find((singleTeam) => singleTeam.teamId === teamPlayer.teamId);
                return team?.teamName;
            }).filter(Boolean);

            return {
                playerId: player.playerId,
                fullName: `${player.firstName} ${player.lastName}`,
                averageScore: player.averageScore,
                highestGame: player.stats.highestGame,
                highestSeries: player.stats.highestSeries,
                perfectGames: player.stats.perfectGames,
                totalPinfall: player.stats.totalPinfall,
                teams: teamNames.join(", "),
            };
        });

        return tableData.filter(Boolean);
    }, [currentLeague, leagueTeams, teams, teamPlayers, players]);



    return { teamsForTable, playersForTable };
}

export default useLeagueTables;