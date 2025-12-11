import './SmallCard.css';
import { Link } from "react-router-dom";

function SmallCard({ leagues }) {
    return (
        <div className="player-card">
            {leagues && leagues.length > 0 ? (
                <div className="league-list">
                    {leagues.map(league => (
                        <Link
                            key={league.id}
                            to={`/competitions/${league.id}`}
                            className="competition-link"
                        >
                            {league.leagueName}
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Geen competitie beschikbaar</p>
            )}
        </div>
    );
}

export default SmallCard;
