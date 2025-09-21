import { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";
import "./Problema5.css"; // Importa tu CSS aquí

export default function Problema5() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [msg, setMsg] = useState("");



    const handleDayChange = (e) => {
        const regex = /^(?:[0-9]|[12][0-9]|3[01])?$/;
        let valor = e.target.value;
        if (regex.test(valor)) {
            setDay(valor === "" ? "" : Number(valor));
        }
    };

    const handleMonthChange = (e) => {
        setMonth(Number(e.target.value));
    };

    const handleYearChange = (e) => {
        const regex = /^(?:(?:[1-9]\d{0,2}|1\d{3}|20[0-1]\d|202[0-5])|0)?$/;
        let valor = e.target.value;
        if (regex.test(valor)) {
            setYear(valor === "" ? "" : Number(valor));
        }
    };

    function esBisiesto(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    const handleChange = () => {
        if (day !== "" && month !== "" && year !== "") {
            let diasEnMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (esBisiesto(year)) diasEnMes[1] = 29;

            if (day <= diasEnMes[month - 1]) {
                calcularEdad();
            } else {
                setMsg("⚠️ El día no corresponde con el mes elegido");
            }
        }
    };

    function calcularEdad() {
        const fechaNacimiento = new Date(year, month - 1, day);
        const fechaActual = new Date();

        if (fechaNacimiento > fechaActual) {
            setMsg("⚠️ La fecha de nacimiento no puede ser posterior a la actual");
            return;
        }

        const duration = intervalToDuration({
            start: fechaNacimiento,
            end: fechaActual,
        });

        setMsg(
            `Edad: ${duration.years ?? 0} años, ${duration.months ?? 0} meses, ${duration.days ?? 0} días`
        );
    }

    useEffect(() => {
        handleChange();
    }, [day, month, year]);

    return (
        <div className="problema5-container">
            <form className="problema5-form">
                <h3 className="problema5-title">Calculadora de Edad</h3>
                <div className="problema5-inputs">
                    <div className="input-group">
                        <label>Día:</label>
                        <input
                            type="number"
                            min={1}
                            max={31}
                            placeholder="Día"
                            onChange={handleDayChange}
                            value={day}
                        />
                    </div>
                    <div className="input-group">
                        <label>Mes:</label>
                        <select value={month} onChange={handleMonthChange}>
                            <option value="" disabled hidden>
                                Seleccione una opción
                            </option>
                            <option value="1">Enero</option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Año:</label>
                        <input
                            type="number"
                            min={1900}
                            max={2025}
                            placeholder="Ingresa el Año"
                            value={year}
                            onChange={handleYearChange}
                        />
                    </div>
                </div>
                {msg && (
                    <div className="problema5-result">
                        <p>{msg}</p>
                    </div>
                )}
            </form>
        </div>
    );
}
