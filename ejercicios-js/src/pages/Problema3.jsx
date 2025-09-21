import { useState } from "react";
import "./Problema3.css"; // importamos el CSS

export default function Problema3() {
    const [compra, setCompra] = useState(0);
    const [descuento, setDescuento] = useState(0);

    const handleChange = (e) => {
        const regex = /^(?!$)[1-9]\d*(\.\d{1,2})?$/;
        let valor = String(e.target.value);

        if (!regex.test(valor)) {
            setDescuento(0);
            return;
        }
        setCompra(Number(valor));
        setDescuento(Number(valor) * 0.15);
    };

    return (
        <div className="problema3-container">
            <form className="problema3-form">
                <h2 className="form-title">Calculadora de Descuento</h2>

                <label className="form-label">Monto de la Compra:</label>
                <input
                    type="number"
                    placeholder="Ingresa el monto de la compra"
                    onChange={handleChange}
                    className="form-input"
                />

                {descuento !== 0 && descuento !== null && (
                    <div className="resultado">
                        <p className="resultado-descuento">
                            Descuento: ${Number(descuento).toFixed(2)}
                        </p>
                        <p className="resultado-total">
                            Total con Descuento: ${Number(compra - descuento).toFixed(2)}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
