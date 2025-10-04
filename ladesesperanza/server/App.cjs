// app.cjs (Usando CommonJS para compatibilidad con la extensión .cjs)
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Importamos CORS para permitir peticiones desde React
// const bodyParser = require('body-parser'); // Ya no es necesario, Express lo tiene integrado

const app = express();
const PORT = 10000; // Puerto del servidor

// --- CONFIGURACIÓN CORS (Crucial para la comunicación con React/Vite) ---
const corsOptions = {
    // 💡 Establecemos el ORIGEN ESPECÍFICO de tu aplicación React
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));
// -----------------------------------------------------------------------

// --- CONFIGURACIÓN DE MIDDLEWARES ---
// Reemplazamos bodyParser con los middlewares integrados de Express
app.use(express.json()); // Para parsear el body de las peticiones JSON (como las de React)
app.use(express.urlencoded({ extended: true })); // Para parsear data de formularios (si aplica)
app.use(express.static('public')); // Para servir archivos estáticos

// --- CONFIGURACIÓN DE CONEXIÓN A LA BASE DE DATOS ---
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'C5m.superGalaxy',
    database: 'baseweb'
});

con.connect(err => {
    if (err) {
        console.error('❌ Error fatal al conectar a la base de datos:', err.stack);
        process.exit(1); // Sale del proceso si no puede conectar a la DB
    }
    console.log('✅ Conectado a MySQL con el ID:', con.threadId);
});

// =================================================================
// 1. FUNCIÓN PARA AGREGAR/REGISTRAR USUARIO
// =================================================================
app.post('/agregarUsuario', (req, res) => {
    const { name, email, password } = req.body;

    // ⚠️ ADVERTENCIA DE SEGURIDAD: Aquí DEBES hashear 'password' con bcrypt o similar.
    const password_hash = password;

    const sql = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';

    con.query(sql, [name, email, password_hash], (err, respuesta) => {
        if (err) {
            console.error("❌ Error al insertar usuario:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "El email ya está registrado." });
            }
            return res.status(500).json({ message: "Error interno al registrar el usuario." });
        }

        console.log(`Usuario ${name} registrado con ID: ${respuesta.insertId}`);
        return res.status(201).json({
            message: `Usuario ${name} registrado con éxito.`,
            userId: respuesta.insertId
        });
    });
});
// =================================================================
// 2. FUNCIÓN PARA CONSULTAR USUARIOS (AJUSTADA PARA BÚSQUEDA)
// =================================================================
app.get('/obtenerUsuario', (req, res) => {
    // 1. Obtener el término de búsqueda de los parámetros de consulta (?q=)
    const searchTerm = req.query.q ? '%' + req.query.q + '%' : '%';

    // 2. Construir la consulta SQL para buscar por nombre O email
    const sql = `
        SELECT id, name, email 
        FROM users 
        WHERE name LIKE ? OR email LIKE ?
    `;

    // 3. Ejecutar la consulta con el término de búsqueda dos veces
    con.query(sql, [searchTerm, searchTerm], (err, respuesta) => {
        if (err) {
            console.error('❌ ERROR al consultar usuarios: ', err);
            // IMPORTANTE: Para peticiones de datos, lo ideal es devolver JSON
            return res.status(500).json({ message: "Error al consultar usuarios" });
        }

        // 4. Devolver los resultados en formato JSON para que React pueda procesarlos
        // NOTA: Si necesitas que siga devolviendo HTML, omite esta línea JSON y mantén la anterior.
        return res.json(respuesta);
    });
});

// app.cjs - FUNCIÓN PARA BORRAR USUARIO MODIFICADA
// =================================================================
// 3. FUNCIÓN PARA BORRAR USUARIO
// =================================================================
app.post('/borrarUsuario', (req, res) => {
    // El ID se extrae correctamente del cuerpo (JSON) de la petición React
    const id = req.body.id;

    if (!id) {
        // Devuelve 400 Bad Request si el ID no está presente
        return res.status(400).json({ success: false, message: "ID requerido para borrar." });
    }

    // Consulta SQL segura para eliminar el registro
    con.query('DELETE FROM users WHERE id = ?', [id], (err, resultado) => {

        if (err) {
            console.error('❌ Error al borrar el usuario:', err);
            // Devuelve 500 Internal Server Error en caso de fallo de DB
            return res.status(500).json({ success: false, message: "Error interno al procesar la solicitud de borrado." });
        }

        if (resultado.affectedRows === 0) {
            // Devuelve 404 Not Found si la fila no existía
            return res.status(404).json({ success: false, message: `Usuario con ID ${id} no encontrado o ya fue borrado.` });
        }

        // Devuelve 200 OK en caso de éxito
        return res.status(200).json({ success: true, message: `Usuario con ID ${id} borrado correctamente.` });
    });
});


// Inicio del Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});
// =================================================================
// 4. FUNCIÓN PARA ACTUALIZAR USUARIO (MÉTODO PUT) - CORREGIDA
// =================================================================
app.put('/actualizarUsuario', (req, res) => {
    // 1. Obtener los datos del cuerpo de la petición (ID, name, email, password)
    const { id, name, email, password } = req.body;

    if (!id || !name || !email) {
        return res.status(400).json({ success: false, message: "Faltan campos obligatorios: ID, Nombre o Email." });
    }

    // 2. Lógica Condicional para la Contraseña
    let sql;
    let queryParams;

    if (password) {
        // Opción A: El usuario proporcionó una nueva contraseña
        // ⚠️ Aquí DEBES hashear la nueva 'password' antes de asignarla a password_hash
        const new_password_hash = password;

        sql = `
            UPDATE users 
            SET name = ?, email = ?, password_hash = ?
            WHERE id = ?
        `;
        queryParams = [name, email, new_password_hash, id];

    } else {
        // Opción B: El campo 'password' está vacío, SOLO actualizamos name y email
        sql = `
            UPDATE users 
            SET name = ?, email = ?
            WHERE id = ?
        `;
        queryParams = [name, email, id];
    }

    // 3. Ejecutar la consulta SQL
    con.query(sql, queryParams, (err, resultado) => {
        if (err) {
            console.error('❌ Error al actualizar el usuario:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: "El email ya está registrado por otro usuario." });
            }
            return res.status(500).json({ success: false, message: "Error interno del servidor al actualizar." });
        }

        if (resultado.affectedRows === 0) {
            // No se encontró el ID o no hubo cambios (si la fila existe, pero no se cambiaron datos)
            return res.status(404).json({ success: false, message: `Usuario con ID ${id} no encontrado.` });
        }

        // 200 OK
        return res.status(200).json({ success: true, message: `Usuario con ID ${id} actualizado correctamente.` });
    });
});
// app.cjs - Nueva ruta para obtener un usuario por ID
// =================================================================
// 5. FUNCIÓN PARA OBTENER UN SOLO USUARIO POR ID (GET)
// =================================================================
app.get('/usuario/:id', (req, res) => {
    // 1. Obtener el ID de los parámetros de la URL
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ success: false, message: "ID del usuario es requerido." });
    }

    // 2. Consulta SQL para seleccionar un solo usuario
    const sql = 'SELECT id, name, email FROM users WHERE id = ?';

    con.query(sql, [userId], (err, respuesta) => {
        if (err) {
            console.error('❌ Error al consultar el usuario:', err);
            return res.status(500).json({ success: false, message: "Error interno del servidor." });
        }

        if (respuesta.length === 0) {
            // No se encontró el usuario
            return res.status(404).json({ success: false, message: `Usuario con ID ${userId} no encontrado.` });
        }

        // Devolver los datos del usuario (el campo password_hash se omite por seguridad)
        return res.status(200).json({ success: true, user: respuesta[0] });
    });
});