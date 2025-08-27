import './NameCard.css';
import {Link} from "react-router-dom";
import noImage from "../../assets/noimage.svg";
import React from "react";

const images = import.meta.glob("../../assets/management/*.{png,jpg,jpeg,svg}", {eager: true});

function getImageById(id) {
    return images[`../../assets/management/${id}.svg`]?.default || null;
}

function NameCard({userId, userName, userFunction, userEmail}) {
    const userImage = getImageById(userId);

    return (
        <div className="user-card hover-effect">
            {userImage ?
                <Link to={`/profile/${userId}`}>
                    <img className="user-profile-pic" src={userImage} alt={`${userFunction} profile picture`}/>
                </Link>
                :
                <img className="no-logo" src={noImage} alt="No profile pic"/>}
            <h3>{userName}</h3>
            <h4>Titel:</h4>
            {userFunction ? <p>{userFunction}</p> : <p>No title available</p>}
            <h4>E-mail:</h4>
            {userEmail ? <p>{userEmail}</p> : <p>No email available</p>}
        </div>
    )
        ;
}


export default NameCard;