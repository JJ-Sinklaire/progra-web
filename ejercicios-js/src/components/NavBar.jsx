import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <Link to={'/home'} className={'tittle-link'}><h3 className="navbar-title">Problemas con JavaScript</h3></Link>
            <ul className="navbar-list">
                {Array.from({ length: 10 }, (_, i) => (
                    <li key={i} className="navbar-item">
                        <Link className="navbar-link" to={`/problema/${i + 1}`}>
                            Problema {i + 1}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;
