import { useState } from "react";
import './Problema9.css'

export default function Problema9() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState('');

    const [pass, setPass] = useState('');
    const [passError, setPassError] = useState('');

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);

    // --- Validaciones ---
    const validateName = (value) => {
        if (!value.trim()) return 'El nombre es obligatorio';
        const regex = /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/;
        return regex.test(value) ? '' : 'Solo se permiten letras y espacios';
    }

    const validateEmail = (value) => {
        if (!value.trim()) return 'El email es obligatorio';
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? '' : 'Email no válido';
    }

    const validatePassword = (value) => {
        if (!value) return 'La contraseña es obligatoria';
        if (value.length < 6) return 'Mínimo 6 caracteres';
        if (!/[a-z]/.test(value)) return 'Debe contener al menos una minúscula';
        if (!/[A-Z]/.test(value)) return 'Debe contener al menos una mayúscula';
        if (!/\d/.test(value)) return 'Debe contener al menos un número';
        return '';
    }

    const validateComment = (value) => {
        if (!value.trim()) return 'Los comentarios son obligatorios';
        if (value.length > 50) return 'Máximo 50 caracteres';
        return '';
    }

    // --- Handlers ---
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (formSubmitted || nameError) setNameError(validateName(value));
    }

    const handleMailChange = (e) => {
        const value = e.target.value;
        setMail(value);
        if (formSubmitted || mailError) setMailError(validateEmail(value));
    }

    const handlePassChange = (e) => {
        const value = e.target.value;
        setPass(value);
        if (formSubmitted || passError) setPassError(validatePassword(value));
    }

    const handleCommentChange = (e) => {
        const value = e.target.value;
        setComment(value);
        if (formSubmitted || commentError) setCommentError(validateComment(value));
    }

    const validateForm = () => {
        const nameErr = validateName(name);
        const mailErr = validateEmail(mail);
        const passErr = validatePassword(pass);
        const commentErr = validateComment(comment);

        setNameError(nameErr);
        setMailError(mailErr);
        setPassError(passErr);
        setCommentError(commentErr);

        return !nameErr && !mailErr && !passErr && !commentErr;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (validateForm()) {
            alert('Formulario enviado correctamente');
            console.log('Datos:', { name, mail, pass, comment });
        } else {
            alert('Por favor, corrige los errores en el formulario');
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-card">
                <h2>Formulario de Registro</h2>

                {/* Nombre */}
                <label>Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={(e) => setNameError(validateName(e.target.value))}
                    className={nameError ? 'error' : ''}
                    placeholder="Tu nombre"
                />
                {nameError && <Warning message={nameError} />}

                {/* Email */}
                <label>Correo Electrónico</label>
                <input
                    type="email"
                    value={mail}
                    onChange={handleMailChange}
                    onBlur={(e) => setMailError(validateEmail(e.target.value))}
                    className={mailError ? 'error' : ''}
                    placeholder="correo@ejemplo.com"
                />
                {mailError && <Warning message={mailError} />}

                {/* Contraseña */}
                <label>Contraseña</label>
                <input
                    type="password"
                    value={pass}
                    onChange={handlePassChange}
                    onBlur={(e) => setPassError(validatePassword(e.target.value))}
                    className={passError ? 'error' : ''}
                    placeholder="********"
                />
                {passError && <Warning message={passError} />}

                {/* Comentarios */}
                <label>Comentarios</label>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    onBlur={(e) => setCommentError(validateComment(e.target.value))}
                    maxLength={50}
                    className={commentError ? 'error' : ''}
                    rows={3}
                    placeholder="Escribe un comentario..."
                />
                <div className="char-count">{comment.length}/50 caracteres</div>
                {commentError && <Warning message={commentError} />}

                {/* Botón */}
                <button type="submit">Enviar</button>
            </form>

            <style>{`
                
            `}</style>
        </div>
    )
}

function Warning({ message }) {
    return (
        <div style={{
            color: 'red',
            fontSize: '13px',
            marginTop: '5px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <span style={{
                color: 'white',
                backgroundColor: 'red',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '6px',
                fontSize: '12px',
                fontWeight: 'bold'
            }}>
                !
            </span>
            {message}
        </div>
    );
}
