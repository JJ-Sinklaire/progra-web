import "./Problema7.css"
import { useState, useEffect } from "react";

export default function Problema7() {
    const [pagoHora, setPagoHora] = useState('');
    const [horas, setHoras] = useState('');
    const [pago, setPago] = useState('');

    const handlePagoHoraChange = (e) => {
        const regex = /^(\d+(\.\d{1,2})?)?$/;
        const value = e.target.value;
        if (regex.test(value) || value === '') {
            setPagoHora(value);
        }
    };

    const handleHorasChange = (e) => {
        const regex = /^([1-9]\d*)?$/;
        const value = e.target.value;
        if (regex.test(value) || value === '') {
            setHoras(value);
        }
    };

    const handleChange = () => {
        const horasNum = horas === '' ? 0 : Number(horas);
        const pagoHoraNum = pagoHora === '' ? 0 : Number(pagoHora);

        if (horas === '' || pagoHora === '') {
            setPago('');
            return;
        }

        if (isNaN(horasNum) || isNaN(pagoHoraNum)) {
            setPago('');
            return;
        }

        if (horasNum > 48) {
            const horasT = horasNum - 48;
            setPago((horasT * 3 * pagoHoraNum + 56 * pagoHoraNum).toString());
        } else if (horasNum > 40) {
            const horasD = horasNum - 40;
            setPago((2 * horasD * pagoHoraNum + 40 * pagoHoraNum).toString());
        } else {
            setPago((horasNum * pagoHoraNum).toString());
        }
    };

    useEffect(() => { handleChange() }, [horas, pagoHora]);

    return (
        <div className="problema-container">
            <h2 className="problema-title">Calculadora de Pago</h2>
            <form className="problema-form">
                <div className="form-group">
                    <label>Sueldo por Hora:</label>
                    <input
                        type="number"
                        min={'0'}
                        value={pagoHora}
                        onChange={handlePagoHoraChange}
                        placeholder="Pago por Hora"
                    />
                </div>

                <div className="form-group">
                    <label>Horas Trabajadas:</label>
                    <input
                        type="number"
                        min={'0'}
                        value={horas}
                        onChange={handleHorasChange}
                        placeholder="Horas Trabajadas"
                    />
                </div>

                {pago && (
                    <div className="resultado">
                        <p>Pago Total: <span>${Number(pago).toFixed(2)}</span></p>
                    </div>
                )}
            </form>
        </div>
    );
}
