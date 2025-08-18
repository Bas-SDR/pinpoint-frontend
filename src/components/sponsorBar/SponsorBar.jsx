import React from "react";
import SponsorImage from "../sponsorImage/SponsorImage.jsx";
import './SponsorBar.css';
import { sponsorsLeft, sponsorsRight } from "../../config/sponsors.js";

function SponsorBar({ sponsorLocation }) {
    const sponsors = sponsorLocation === "right" ? sponsorsRight : sponsorsLeft;

    return (
        <div className={`sponsor-bar ${sponsorLocation}`}>
            {sponsors.map(sponsor => (
                <SponsorImage
                    key={`${sponsorLocation}-${sponsor.id}`}
                    sponsorName={sponsor.name}
                    logo={sponsor.logo}
                />
            ))}
        </div>
    );
}

export default SponsorBar;