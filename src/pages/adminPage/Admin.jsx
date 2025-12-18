import './Admin.css';
import Header from "../../components/header/Header.jsx";
import Button from "../../components/button/Button.jsx";

function Admin() {
    return (
        <div className="outer-container-incl-sponsor">
            <Header>Admin</Header>
            <div className="page-content">
                <Button>
                    Create League
                </Button>
            </div>
        </div>
    );
}

export default Admin;