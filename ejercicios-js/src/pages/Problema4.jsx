import { useState, useEffect } from "react";
import "./Problema4.css"; // importamos estilos

export default function Problema4() {
    const regex = /^(?:10(?:\.0)?|[0-9](?:\.\d)?)$/;

    const [calificaciones, setCalificaciones] = useState([0, 0, 0]);
    const [examen, setExamen] = useState(0);
    const [trabajo, setTrabajo] = useState(0);
    const [cFinal, setCFinal] = useState(0);

    const handleParciales = (e, i) => {
        const valor = e.target.value;
        const newCalificaciones = [...calificaciones];
        newCalificaciones[i] = regex.test(valor) ? Number(valor) : 0;
        setCalificaciones(newCalificaciones);
    };

    const handleExamen = (e) => {
        const valor = e.target.value;
        setExamen(regex.test(valor) ? Number(valor) : 0);
    };

    const handleTrabajo = (e) => {
        const valor = e.target.value;
        setTrabajo(regex.test(valor) ? Number(valor) : 0);
    };

    function calcularPromedio(calificaciones) {
        if (calificaciones.length === 0) return 0;
        return calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
    }

    const handleCFinal = () => {
        const promedioParciales = calcularPromedio(calificaciones);
        const calificacionFinal =
            promedioParciales * 0.55 + examen * 0.3 + trabajo * 0.15;
        setCFinal(calificacionFinal);
    };

    useEffect(() => {
        handleCFinal();
    }, [calificaciones, examen, trabajo]);

    return (
        <div className="problema4-container">
            <form className="problema4-form">
                <h2 className="form-title">Calculadora de Calificación Final</h2>

                <label className="form-label">Calificaciones Parciales:</label>
                <div className="parciales">
                    <input
                        type="number"
                        min={'0'}
                        max={'10'}
                        placeholder="Primer Parcial"
                        onChange={(e) => handleParciales(e, 0)}
                        className="form-input"
                    />
                    <input
                        type="number"
                        min={'0'}
                        max={'10'}
                        placeholder="Segundo Parcial"
                        onChange={(e) => handleParciales(e, 1)}
                        className="form-input"
                    />
                    <input
                        type="number"
                        min={'0'}
                        max={'10'}
                        placeholder="Tercer Parcial"
                        onChange={(e) => handleParciales(e, 2)}
                        className="form-input"
                    />
                </div>

                <label className="form-label">Calificación Examen Final:</label>
                <input
                    type="number"
                    min={'0'}
                    max={'10'}
                    placeholder="Examen Final"
                    onChange={handleExamen}
                    className="form-input"
                />

                <label className="form-label">Calificación Trabajo Final:</label>
                <input
                    type="number"
                    min={'0'}
                    max={'10'}
                    placeholder="Trabajo Final"
                    onChange={handleTrabajo}
                    className="form-input"
                />

                {cFinal >= 0 && (
                    <p className="resultado">
                        Calificación Final: <span>{cFinal.toFixed(2)}</span>
                    </p>
                )}
            </form>
        </div>
    );
}
