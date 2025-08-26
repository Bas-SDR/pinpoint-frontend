import './Team.css';
import Header from "../../components/header/Header.jsx";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import useProfileData from "../../hooks/useProfileData.js";
import {useParams} from "react-router-dom";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";

function Team() {
    const {isAuth, userId} = useContext(AuthContext);
    const {teams, leagues, players, loading, error} = useProfileData();
    const {teamId} = useParams();

    return (
        <div className="outer-container-excl-sponsor">
            <StatusMessage loading={loading} error={error}/>
            {!loading && !error && (
                <Header>
                    Team {teams.find(team => team.teamId === Number(teamId))?.teamName ?? "Not found"}
                </Header>
            )}
        </div>
    );
}

export default Team;