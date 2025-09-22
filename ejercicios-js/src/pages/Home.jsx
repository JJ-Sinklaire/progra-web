import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Ejercicios con JavaScript</h1>
            <p className="home-subtitle">Selecciona un ejercicio...</p>

            <div className="home-grid">
                {Array.from({ length: 10 }, (_, i) => (
                    <Link key={i} to={`/problema/${i + 1}`} className="home-card">
                        <h2>Problema {i + 1}</h2>
                        <p>Ver ejercicio {i + 1}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
