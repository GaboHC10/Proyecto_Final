const express = require('express');
const empleado = express.Router();
const db = require('./Config/database');

// Crear empleado
empleado.post('/', async (req, res) => {
    const { cNombre, cApellidos, cTelefono, cCorreo, cDireccion } = req.body;

    if (cNombre && cApellidos && cTelefono && cCorreo && cDireccion) {
        let query = `INSERT INTO t_empleados (cNombre, cApellidos, cTelefono, cCorreo, cDireccion)
                     VALUES (?, ?, ?, ?, ?)`;
        const rows = await db.query(query, [cNombre, cApellidos, cTelefono, cCorreo, cDireccion]);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: 'Nuevo Registro de Empleado Exitoso' });
        }
        return res.status(500).json({ code: 500, message: 'Registro de Empleado Fallido' });
    }
    return res.status(400).json({ code: 400, message: 'Rellena todos los campos' });
});

// Eliminar empleado
empleado.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) return res.status(400).json({ code: 400, message: 'ID inválido' });

    const query = `DELETE FROM t_empleados WHERE nEmpleadoID = ?`;
    const rows = await db.query(query, [id]);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: 'Empleado eliminado correctamente' });
    }
    return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

// Modificar todo el empleado
empleado.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { cNombre, cApellidos, cTelefono, cCorreo, cDireccion } = req.body;

    if (cNombre && cApellidos && cTelefono && cCorreo && cDireccion) {
        let query = `UPDATE t_empleados SET cNombre=?, cApellidos=?, cTelefono=?, cCorreo=?, cDireccion=? WHERE nEmpleadoID=?`;
        const rows = await db.query(query, [cNombre, cApellidos, cTelefono, cCorreo, cDireccion, id]);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: 'Empleado actualizado' });
        }
        return res.status(500).json({ code: 500, message: 'Fallo al actualizar' });
    }
    return res.status(400).json({ code: 400, message: 'Campos incompletos' });
});

// Modificar solo nombre
empleado.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (!req.body.cNombre) return res.status(400).json({ code: 400, message: 'Falta nombre' });

    const query = `UPDATE t_empleados SET cNombre=? WHERE nEmpleadoID=?`;
    const rows = await db.query(query, [req.body.cNombre, id]);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: 'Nombre actualizado' });
    }
    return res.status(500).json({ code: 500, message: 'Error al actualizar' });
});

// Obtener todos
empleado.get('/', async (req, res) => {
    const emp = await db.query('SELECT * FROM t_empleados');
    return res.status(200).json({ code: 200, message: emp });
});

// Obtener por ID
empleado.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const emp = await db.query('SELECT * FROM t_empleados WHERE nEmpleadoID = ?', [id]);

    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

// Obtener por nombre
empleado.get('/nombre/:name', async (req, res) => {
    const name = req.params.name;
    const emp = await db.query('SELECT * FROM t_empleados WHERE UPPER(cNombre) = UPPER(?)', [name]);

    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

module.exports = empleado;
