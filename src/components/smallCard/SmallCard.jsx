import './SmallCard.css';
import { Link } from "react-router-dom";

function SmallCard({ competition, ranking, averageScore, highestGame, highestSeries, leagues, children }) {
    return (
        <div className="player-card">
            {competition !== undefined && (
                <Link to={`/competitions/${competition}`} className="competition-link">
                    <h3>{competition}</h3>
                </Link>
            )}

            <div className="stats-group">
                {ranking !== undefined && <p>Plaats: {ranking}</p>}
                {averageScore !== undefined && <p>Gemiddelde score: {averageScore}</p>}
                {highestGame !== undefined && <p>Hoogste game: {highestGame}</p>}
                {highestSeries !== undefined && <p>Hoogste serie: {highestSeries}</p>}
            </div>

            {leagues && leagues.length > 0 && (
                <div className="league-list">
                    {leagues.map(league => (
                        <Link key={league.id} to={`/competitions/${league.id}`} className="competition-link">
                            {league.leagueName}
                        </Link>
                    ))}
                </div>
            )}

            {children}
        </div>
    );
}

export default SmallCard;
