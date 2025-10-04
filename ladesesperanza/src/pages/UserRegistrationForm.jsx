import React, { useState } from 'react';
import styles from './UserRegistrationForm.module.css';

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || formData.password.length < 6) {
            setMessage('❌ Por favor, completa todos los campos correctamente.');
            return;
        }

        try {
            const response = await fetch('http://localhost:10000/agregarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`✅ ${result.message}`);
                setFormData({ name: '', email: '', password: '' });
            } else {
                setMessage(`❌ Error: ${result.message || 'No se pudo registrar el usuario.'}`);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setMessage('❌ Error de conexión. Asegúrate de que el servidor está corriendo en el puerto 10000.');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Registro de Usuario</h2>

            {message && (
                <p className={`${styles.message} ${message.startsWith('✅') ? styles.success : styles.error}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Contraseña (min. 6 caracteres):</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>

                <button type="submit">Registrar Usuario</button>
            </form>
        </div>
    );
};

export default UserRegistrationForm;
