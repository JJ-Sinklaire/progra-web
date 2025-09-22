import {useState, useEffect} from "react";
import './Problema8.css';
import {isBefore, isValid, differenceInYears} from "date-fns";

export default function Problema8() {
    const [sueldoMensual, setSueldoMensual] = useState('');
    const [antiguedad, setAntiguedad] = useState('');
    const [utilidad, setUtilidad] = useState('');

    const sueldoChange = (e) => {
        const regex = /^(\d+(\.\d{1,2})?)?$/;
        const value = e.target.value;
        if (regex.test(value) || value === '') {
            setSueldoMensual(value);
        }
    }

    const antiguedadChange = (e) => {
        const fechaActual = new Date();
        const valor = e.target.value;

        if (valor === '') {
            setAntiguedad('');
            return;
        }

        const fechaIngresada = new Date(valor);

        if (isValid(fechaIngresada) && isBefore(fechaIngresada, fechaActual)) {
            setAntiguedad(valor);
        }
    };

    const calcularUtilidad = () => {
        if (sueldoMensual === "" || antiguedad === "") {
            setUtilidad('');
            return;
        }

        const years = differenceInYears(new Date(), new Date(antiguedad));
        const sueldoNum = Number(sueldoMensual);


        if (years >= 10) {
            setUtilidad(sueldoNum * 0.2);
        } else if (years >= 5) {
            setUtilidad(sueldoNum * 0.15);
        } else if (years >= 2) {
            setUtilidad(sueldoNum * 0.1);
        } else if (years >= 1) {
            setUtilidad(sueldoNum * 0.07);
        } else {
            setUtilidad(sueldoNum * 0.05);
        }
    }

    useEffect(() => {
        calcularUtilidad();
    }, [sueldoMensual, antiguedad]);

    return (
        <>
            <div className="problema-container">
                <form className="problema-form">
                    <label className="problema-label">Sueldo Mensual:</label>
                    <input
                        type="number"
                        min={0}
                        value={sueldoMensual}
                        onChange={sueldoChange}
                        className="problema-input"
                    />

                    <label className="problema-label">Antigüedad:</label>
                    <input
                        type="date"
                        onChange={antiguedadChange}
                        className="problema-input"
                        value={antiguedad}
                    />

                    {utilidad !== "" && sueldoMensual !== "" && antiguedad !== "" && (
                        <div className="problema-resultado">
                            <p>
                                Nuevo Sueldo:
                                <span className="resaltado">${(Number(sueldoMensual) + Number(utilidad)).toFixed(2)}</span>
                                &nbsp;
                                <span className="bonus"> (+${Number(utilidad).toFixed(2)})</span>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}