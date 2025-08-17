import './PlayerCard.css';
import {Link} from "react-router-dom";

function PlayerCard({competition, ranking, averageScore }) {
    return (
        <div className="player-card">
            {competition !== "" ? <Link to={`/competitions/${competition}`} className="competition-link"> <h3>{competition}</h3> </Link>: <p>Geen statistieken beschikbaar</p>}
            {ranking !== "" ? <p>Plaats: {ranking}</p> : null}
            {averageScore !== "" ? <p>Gemiddelde score: {averageScore}</p> : null}
        </div>
    );
}

export default PlayerCard;