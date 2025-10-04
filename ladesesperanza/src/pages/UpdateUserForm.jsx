import React, { useState } from 'react';
import styles from './UpdateUserForm.module.css';

const UserUpdateForm = () => {
    const [targetId, setTargetId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setMessage('');
    };

    const handleLoadUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsEditing(false);

        if (!targetId.trim()) {
            setMessage('❌ Introduce un ID para cargar.');
            return;
        }

        setLoading(true);
        const url = `http://localhost:10000/usuario/${targetId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (response.ok && result.success) {
                setFormData({
                    name: result.user.name,
                    email: result.user.email,
                    password: '',
                });
                setIsEditing(true);
                setMessage(`✅ Usuario ID ${targetId} cargado. Modifica los campos.`);
            } else if (response.status === 404) {
                setMessage(`❌ ${result.message}`);
            } else {
                setMessage(`❌ Error al cargar: ${result.message}`);
            }
        } catch (error) {
            console.error('Error de conexión al cargar usuario:', error);
            setMessage('❌ Error de conexión. Asegúrate de que el servidor está corriendo.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!formData.name || !formData.email) {
            setMessage('❌ Nombre y Email son obligatorios.');
            setLoading(false);
            return;
        }

        const dataToSend = {
            id: targetId,
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        const url = `http://localhost:10000/actualizarUsuario`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`✅ ${result.message}`);
                setIsEditing(false);
                setTargetId('');
            } else {
                setMessage(`❌ Error [${response.status}]: ${result.message}`);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setMessage('❌ Error de conexión al intentar actualizar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>✏️ Modificación de Usuario</h2>

            {message && (
                <p className={message.startsWith('✅') ? styles.success : styles.error}>
                    {message}
                </p>
            )}

            {!isEditing && (
                <form onSubmit={handleLoadUser} className={styles.form}>
                    <label>ID del Usuario a Modificar:</label>
                    <div className={styles.row}>
                        <input
                            type="number"
                            value={targetId}
                            onChange={(e) => setTargetId(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading} className={styles.primaryBtn}>
                            {loading ? 'Cargando...' : 'Cargar'}
                        </button>
                    </div>
                </form>
            )}

            {isEditing && (
                <form onSubmit={handleUpdate} className={styles.form}>
                    <p>Modificando ID: <strong>{targetId}</strong></p>

                    <div className={styles.field}>
                        <label>Nombre:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className={styles.field}>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className={styles.field}>
                        <label>Contraseña (Deja vacío para no cambiar):</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Nueva Contraseña" />
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" disabled={loading} className={styles.successBtn}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserUpdateForm;
