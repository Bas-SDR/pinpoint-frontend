import './StatsCard.css';

function StatsCard({ highestGame, highestSeries, totalPinfall, averagePinfall, perfectGames  }) {
    return (
        <div className="stats-card">
            <h3>Algemene statistieken:</h3>
            <ul>
                <li>Hoogste game: <strong>{highestGame}</strong></li>
                <li>Hoogste serie: <strong>{highestSeries}</strong></li>
                <li>Totale pinfall: <strong>{totalPinfall}</strong></li>
                <li>Gemiddelde pinfall: <strong>{averagePinfall}</strong></li>
                <li>Perfect Games: <strong>{perfectGames}</strong></li>
            </ul>
        </div>
    );
}

export default StatsCard;