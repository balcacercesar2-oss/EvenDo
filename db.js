const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración para MARK1\SQLEXPRESS
const config = {
    connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=MARK1\\SQLEXPRESS;Database=EvenDoDB;Trusted_Connection=yes;',
};

// RUTA PARA GUARDAR LOS DATOS
app.post('/comprar', async (req, res) => {
    const { nombre, apellido, paquete, lugar, fecha, pago } = req.body;

    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('n', sql.NVarChar, nombre)
            .input('a', sql.NVarChar, apellido)
            .input('p', sql.NVarChar, paquete)
            .input('l', sql.NVarChar, lugar)
            .input('f', sql.Date, fecha)
            .input('m', sql.NVarChar, pago)
            .query(`INSERT INTO Reservas (Nombre, Apellido, Paquete, LugarEvento, FechaEvento, MetodoPago) 
                    VALUES (@n, @a, @p, @l, @f, @m)`);

        console.log(`✅ Registro exitoso: ${nombre} ${apellido}`);
        res.status(200).send({ mensaje: "Guardado en SQL Express" });
    } catch (err) {
        console.error("❌ Error en SQL:", err);
        res.status(500).send({ error: "Error al inyectar datos" });
    }
});

app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("🚀 Servidor DB.JS activo en puerto 3000");
    console.log("🖥️  Conectado a MARK1\\SQLEXPRESS");
    console.log("-----------------------------------------");
});
