import './Header.css';

function Header({ pageTitle }) {
    return (
        <header>
            <h1>{pageTitle}</h1>
        </header>
    );
}

export default Header;