import React, { useState } from 'react';
import './UserDeletion.css'

const UserDeletionForm = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!userId.trim()) {
            setMessage('❌ Por favor, introduce el ID del usuario a eliminar.');
            return;
        }

        setLoading(true);
        const url = `http://localhost:10000/borrarUsuario`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`✅ ${result.message}`);
                setUserId('');
            } else {
                setMessage(`❌ Error [${response.status}]: ${result.message}`);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setMessage('❌ Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-form-container">
            <h2>🗑️ Eliminar Usuario por ID</h2>

            {message && (
                <p className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleDelete}>
                <div className="form-group">
                    <label htmlFor="userId">ID del Usuario:</label>
                    <input
                        type="number"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Eliminando...' : 'Eliminar Usuario'}
                </button>
            </form>
        </div>
    );
};

export default UserDeletionForm;
