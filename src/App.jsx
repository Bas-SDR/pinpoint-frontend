import './App.css'
import NavBar from "./components/navBar/NavBar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "./pages/profilePage/Profile.jsx";
import SignIn from "./pages/signInPage/SignIn.jsx";
import SignUp from "./pages/signUpPage/SignUp.jsx";
import Home from "./pages/homePage/Home.jsx";
import NotFound from "./pages/notFoundPage/NotFound.jsx";
import Competitions from "./pages/competitionsPage/Competitions.jsx";
import Info from "./pages/infoPage/Info.jsx";
import News from "./pages/newsPage/News.jsx";
import Contact from "./pages/contactPage/Contact.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import Admin from "./pages/adminPage/Admin.jsx";
import Privacy from "./pages/privacy/Privacy.jsx";
import Team from "./pages/teamPage/Team.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/info" element={<Info/>}/>
                    <Route path="/competitions" element={<Competitions/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/profile/:playerId" element={isAuth ? <Profile/> : <Navigate to="/" />}/>
                    <Route path="/team/:teamId" element={isAuth ? <Team/> : <Team/>}/>
                    <Route path="/admin" element={isAuth ? <Admin/> : <Navigate to="/" />}/> {/*TODO Make check on role instead of isAuth*/}
                    <Route path="/privacy" element={<Privacy/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App
