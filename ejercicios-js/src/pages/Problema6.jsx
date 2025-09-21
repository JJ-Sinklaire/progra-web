import React, { useState, useEffect } from 'react';
import "./Problema6.css";

export default function Problema6() {
    const [texto, setTexto] = useState('');
    const [resultado, setResultado] = useState([]);

    const mapeoNumerico = {
        'cero': 0,
        'uno': 1,
        'dos': 2,
        'tres': 3,
        'cuatro': 4,
        'cinco': 5,
        'seis': 6,
        'siete': 7,
        'ocho': 8,
        'nueve': 9,
        'diez': 10
    };

    const traducir = (textoEntrada) => {
        const palabras = textoEntrada.toLowerCase().split(' ').filter(Boolean);
        return palabras.map(palabra => (
            mapeoNumerico.hasOwnProperty(palabra) ? mapeoNumerico[palabra] : -1
        ));
    };

    useEffect(() => {
        if (texto.length > 0) {
            const resultadoTraducido = traducir(texto);
            setResultado(resultadoTraducido);
        } else {
            setResultado([]);
        }
    }, [texto]);

    return (
        <div className="traductor-container">
            <h1 className="traductor-title">Traductor Automático</h1>
            <p className="traductor-subtitle">Convierte palabras en números (0 - 10)</p>

            <form className="traductor-form">
                <input
                    type="text"
                    className="traductor-input"
                    placeholder="Ejemplo: uno dos tres"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
            </form>

            {resultado.length > 0 && (
                <div className="traductor-result">
                    <h2>Resultado:</h2>
                    <p>{resultado.join(', ')}</p>
                </div>
            )}
        </div>
    );
}
