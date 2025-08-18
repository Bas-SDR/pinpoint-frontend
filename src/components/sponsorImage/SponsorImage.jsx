import React from "react";
import './SponsorImage.css';
import noLogo from "../../assets/teamlogo/nologo.png";

function SponsorImage({ logo, sponsorName }) {
    return (
        <span className="sponsor-banner">
            <img
                className="sponsor-logo"
                src={logo || noLogo}
                alt={`${sponsorName} logo`}
            />
        </span>
    );
}

export default SponsorImage;