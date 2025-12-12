import './League.css';
import {useParams, Link} from "react-router-dom";
import useProfileData from "../../hooks/useProfileData.js";
import useLeagueTable from "../../hooks/useLeagueTable.js";
import getCurrentEntity from "../../helpers/getCurrentPageId.js";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import TableSorting from "../../components/tableSorting/TableSorting.jsx";
import Header from "../../components/header/Header.jsx";
import React, {useMemo} from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";

function League() {
    const {leagues = [], teams = [], players = [], loading, error} = useProfileData();
    const {leagueId} = useParams();
    const currentLeague = getCurrentEntity(leagues, leagueId, "id");

    const {teamsForTable = [], playersForTable = []} = useLeagueTable(
        currentLeague,
        teams,
        players
    );

    const teamColumns = useMemo(() => [
        {accessorKey: "position", header: "Positie", enableSorting: true},
        {
            accessorKey: "teamName", header: "Team", enableSorting: true,
            cell: ({row}) => {
                const team = row.original;
                return (
                    <Link to={`/team/${team.id}`}>
                        {team.teamName}
                    </Link>
                );
            }
        },
        {accessorKey: "players", header: "Spelers", enableSorting: false},
        {accessorKey: "teamSize", header: "Aantal", enableSorting: true},
    ], []);

    const playerColumns = useMemo(() => [
        {
            accessorKey: "fullName",
            header: "Speler",
            enableSorting: true,
            cell: ({row}) => {
                const player = row.original;
                return (
                    <Link to={`/profile/${player.id}`}>
                        {player.fullName}
                    </Link>
                );
            }
        },
        {accessorKey: "averageScore", header: "Gemiddelde", enableSorting: true},
        {accessorKey: "highestGame", header: "Hoogste game", enableSorting: true},
        {accessorKey: "highestSeries", header: "Hoogste serie", enableSorting: true},
        {accessorKey: "perfectGames", header: "Perfecte scores", enableSorting: true},
        {accessorKey: "totalPinfall", header: "Totale pinfall", enableSorting: true},
        {accessorKey: "teams", header: "Teams", enableSorting: false},
    ], []);

    const teamTable = useReactTable({
        data: teamsForTable,
        columns: teamColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const playerTable = useReactTable({
        data: playersForTable,
        columns: playerColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {sorting: [{id: "averageScore", desc: true}]},
    });

    return (
        <div className="outer-container-excl-sponsor">
            {loading ? (
                <StatusMessage loading={loading} error={error}/>
            ) : (
                <>
                    <Header>{currentLeague?.leagueName}</Header>
                    <div className="table-outer-box">
                        <div className="table-contents">
                            <h1>Team Leaderboard</h1>
                            <TableSorting table={teamTable}/>
                        </div>
                        <div className="table-contents">
                            <h1>Speler Leaderboard</h1>
                            <TableSorting table={playerTable}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default League;