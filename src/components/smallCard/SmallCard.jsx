import './SmallCard.css';
import {Link} from "react-router-dom";

function SmallCard({competition, ranking, averageScore, highestGame,highestSeries, children }) {
    return (
        <div className="player-card">
            {competition !== undefined ? <Link to={`/competitions/${competition}`} className="competition-link"> <h3>{competition}</h3> </Link>: <p>Geen competitie beschikbaar</p>}
            {ranking !== undefined && <p>Plaats: {ranking}</p>}
            {averageScore !== undefined && <p>Gemiddelde score: {averageScore}</p>}
            {highestGame !== undefined && <p>Hoogste game: {highestGame}</p>}
            {highestSeries !== undefined && <p>Hoogste serie: {highestSeries}</p>}
        </div>
    );
}

export default SmallCard;