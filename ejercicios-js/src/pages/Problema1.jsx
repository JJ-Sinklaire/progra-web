import { useState } from "react";
import "./Problema1.css"; // importa los estilos

function Problema1() {
    const [capital, setCapital] = useState(0);
    const [meses, setMeses] = useState(1);
    const [resultado, setResultado] = useState(null);

    const calcularGanancia = (e) => {
        e.preventDefault();
        setResultado(capital * Math.pow(1 + 0.2, meses));
    };

    return (
        <div className="problema1-container">
            <form className="problema1-form" onSubmit={calcularGanancia}>
                <h2 className="form-title">Calculadora de Inversión</h2>

                <input
                    className="form-input"
                    type="number"
                    placeholder="Ingresa el capital inicial"
                    onChange={(e) => setCapital(Number(e.target.value))}
                    required
                />

                <input
                    className="form-input"
                    type="number"
                    placeholder="Meses de la inversión"
                    onChange={(e) => setMeses(Number(e.target.value))}
                    required
                />

                <button className="form-button" type="submit">
                    Calcular
                </button>
            </form>

            {resultado !== null && (
                <h3 className="resultado">Capital Final: ${Number(resultado).toFixed(2)}</h3>
            )}
        </div>
    );
}

export default Problema1;
