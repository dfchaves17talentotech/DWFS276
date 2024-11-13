import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../database/db_connect_pg";

export const getEmpleados = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result: QueryResult = await pool.query('SELECT * FROM empleados ORDER BY id ASC;');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const getEmpleadoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const empleadoId = parseInt(req.params.id);
        const response: QueryResult = await pool.query(`SELECT * FROM empleados WHERE id = $1`, [empleadoId]);
        return res.json(response.rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const createEmpleado = async (req: Request, res: Response): Promise<Response> => {
    const { id, nombre, apellido, edad, departamento } = req.body;
    if (id !== null && nombre !== null && apellido !== null && edad !== undefined) {
        try {
            await pool.query(
            'INSERT INTO empleados (id, nombre, apellido, edad, departamento_id) values ($1, $2, $3, $4, $5)',
            [id, nombre, apellido, edad, departamento]
        );
        return res.status(201).json({
            message: "Empleado created successfully",
            empleado: {
            id,
            nombre,
            apellido,
            edad,
            departamento
            }
        });
        } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
        }
    } else {
        return res.status(400).json({ message: "Bad Request" });
    }
    };

    export const deleteEmpleado = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM empleados WHERE id = $1', [id]);
        return res.status(200).json({ message: `El empleado ${id} fue eliminado con éxito.` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
        }
    };

export const updateEmpleado = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { edad, departamento } = req.body;
    try {
        await pool.query('UPDATE empleados SET edad = $1, departamento_id = $2 WHERE id = $3', [edad, departamento, id]);
        return res.status(200).json({ message: `El empleado ${id} fue actualizado con éxito.` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
