import './InfoTile.css';

function InfoTile({tileImage, tileTitle, tileType, imageAltTile, tileOrientation, children}) {
    return (
        <section className={`hover-effect tile-view ${tileOrientation} ${tileType}`}>
            <img src={tileImage} alt={imageAltTile}/>
            <div className="tile-content">
            <h2>{tileTitle}</h2>
            {children}
            </div>
        </section>
    );
}

export default InfoTile;