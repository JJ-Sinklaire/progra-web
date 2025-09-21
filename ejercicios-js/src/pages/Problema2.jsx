import { useState } from "react";
import "./Problema2.css"; // importa los estilos

export default function Problema2() {
    const [ventas, setVentas] = useState(0);
    const [resultado, setResultado] = useState(null);
    const [sueldoBase, setSueldoBase] = useState("");
    const [monto, setMonto] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = Number(sueldoBase) + ventas * 0.1;
        setResultado(total);
    };

    function pushVenta(valor) {
        if (valor !== "") {
            setVentas(ventas + Number(valor));
            setMonto("");
        }
    }

    return (
        <div className="problema2-container">
            <form className="problema2-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Cálculo de Sueldo con Ventas</h2>

                <label className="form-label">Sueldo base:</label>
                <input
                    className="form-input"
                    type="number"
                    placeholder="Ingrese el sueldo base"
                    value={sueldoBase}
                    onChange={(e) => setSueldoBase(e.target.value)}
                />

                <label className="form-label">Ventas:</label>
                <div className="venta-inputs">
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Ingrese el monto de la venta"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                    />
                    <button
                        type="button"
                        className="add-button"
                        onClick={() => pushVenta(monto)}
                    >
                        Agregar Venta
                    </button>
                </div>

                <button className="form-button" type="submit">
                    Calcular
                </button>
            </form>

            <div className="resultados">
                <p className="total-ventas">Total de Ventas: ${Number(ventas).toFixed(2)}</p>
                {resultado !== null && (
                    <p className="resultado-final">Sueldo Final: $ {Number(resultado).toFixed(2)}</p>
                )}
            </div>
        </div>
    );
}
