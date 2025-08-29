import './NewsTile.css';

function NewsTile({tileImage, tileTitle, tileType, imageAltTile, children}) {
    return (
        <section className={`hover-effect tile-view ${tileType}`}>
            <img src={tileImage} alt={imageAltTile}/>
            <div className="tile-content">
            <h2>{tileTitle}</h2>
            {children}
            </div>
        </section>
    );
}

export default NewsTile;