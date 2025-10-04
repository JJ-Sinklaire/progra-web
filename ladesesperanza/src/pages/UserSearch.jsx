import React, { useState, useEffect } from 'react';
import styles from './UserSearch.module.css';

const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setUsers([]);
            setError(null);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetchUsers(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchUsers = async (term) => {
        setLoading(true);
        setError(null);

        const url = `http://localhost:10000/obtenerUsuario?q=${encodeURIComponent(term)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Error interno del servidor.`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Error de búsqueda. Detalles: ${err.message}`);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Búsqueda de Usuarios</h2>

            <input
                type="text"
                placeholder="Escribe el nombre o email a buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input}
            />

            {loading && <p className={styles.loading}>Cargando resultados...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {(!loading && !error && users.length === 0 && searchTerm.trim()) && (
                <p className={styles.noResults}>
                    No se encontraron usuarios para: <strong>{searchTerm}</strong>
                </p>
            )}

            {users.length > 0 && (
                <>
                    <h3 className={styles.resultsTitle}>Resultados ({users.length})</h3>
                    <ul className={styles.resultsList}>
                        {users.map((user) => (
                            <li key={user.id} className={styles.resultItem}>
                                <strong>{user.name}</strong> ({user.email})
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default UserSearch;
