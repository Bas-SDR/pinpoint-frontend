import './Profile.css';
import profilePic from "../../assets/profile-pic-man1.png"

function Profile() {
    return (
        <>
            <h2>Profiel van</h2>
            <h1>Voornaam Achternaam</h1>{/*TODO Add first and last name from JWT token*/}
            <span className="image-container">
            <img src={profilePic} alt="photo of player"/>
            </span>



        </>
    );
}

export default Profile;