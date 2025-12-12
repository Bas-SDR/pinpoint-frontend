import './Competitions.css';
import React from "react";
import Header from "../../components/header/Header.jsx";
import StatusMessage from "../../components/statusMessage/StatusMessage.jsx";
import BigCard from "../../components/bigCard/BigCard.jsx";
import useProfileData from "../../hooks/useProfileData.js";
function Competitions() {

    const {leagues, loading, error} = useProfileData();
    console.log(leagues);

    return (
        <div className="outer-container-excl-sponsor">
            {loading ?
                <StatusMessage loading={loading} error={error}/>
                :
                <Header>Competities</Header>
            }
            <div className="team-collection">
                {leagues.length > 0 ? leagues.map((league) => {
                        const firstPlace = league.leagueTeams  && league.leagueTeams .length > 0 ? league.leagueTeams[0] : null;

                        return (
                            <article key={league?.id}>
                                    <BigCard
                                        leagueId={league?.id}
                                        type="league"
                                        leagueName={league?.leagueName}
                                        leagueMembers={league?.teams?.length}
                                        leagueFirst={firstPlace ? firstPlace.teamName : "Nog geen teams"}
                                    />
                            </article>
                        );
                    })
                    : (
                        <p>Er zijn geen competities beschikbaar</p>
                    )}
            </div>
        </div>
    );
}

export default Competitions;