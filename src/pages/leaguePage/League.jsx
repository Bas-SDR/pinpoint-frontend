import './League.css';
import {useParams} from "react-router-dom";
import useProfileData from "../../hooks/useProfileData.js";

function League() {
    const {teams, leagues, players, loading, error} = useProfileData();
    const {leagueId} = useParams();

    return (
        <div className="outer-container-excl-sponsor">
            <h2>Hoi</h2>
        </div>
    );
}

export default League;