import './PlayerCard.css';

function PlayerCard({competition, ranking, averageScore }) {
    return (
        <div className="player-card">
            {competition !== "" ? <h3>{competition}</h3> : <p>No stats available</p>}
            {ranking !== "" ? <p>Plaats: {ranking}</p> : null}
            {averageScore !== "" ? <p>Gemiddelde score: {averageScore}</p> : null}
        </div>
    );
}

export default PlayerCard;