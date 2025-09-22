import React, { useState } from 'react';
import './Problema10.css';

export default function Problema10() {
    const [rawText, setRawText] = useState('');
    const [sanitizedText, setSanitizedText] = useState('');

    const removeScriptTags = (htmlString) => {
        const scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
        return htmlString.replace(scriptRegex, '');
    };

    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setRawText(inputText);

        const cleanText = removeScriptTags(inputText);
        setSanitizedText(cleanText);
    };

    return (
        <div className="problema10-container">
            <h1 className="problema10-title">Sanitizador de HTML</h1>
            <p className="problema10-description">
                Ingresa un texto, incluyendo código HTML, y se eliminarán automáticamente las etiquetas
                <code>&lt;script&gt;</code> y su contenido.
            </p>
            <form className="problema10-form">
                <div className="form-group">
                    <label htmlFor="raw-input">Texto Original:</label>
                    <textarea
                        id="raw-input"
                        value={rawText}
                        onChange={handleTextChange}
                        placeholder="Ingresa tu texto HTML aquí..."
                        rows="10"
                        className="textarea-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sanitized-output">Texto Sanitizado:</label>
                    <textarea
                        id="sanitized-output"
                        value={sanitizedText}
                        readOnly
                        rows="10"
                        className="textarea-output"
                    />
                </div>
            </form>
        </div>
    );
}
