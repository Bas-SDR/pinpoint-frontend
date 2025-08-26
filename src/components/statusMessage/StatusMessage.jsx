import './StatusMessage.css';
import Header from "../header/Header.jsx";

function StatusMessage({ loading, error}) {
    if (loading) return <Header>De pagina wordt geladen</Header>;
    if (error) return <Header>Er ging iets fout</Header>;
    return null;
}

export default StatusMessage;