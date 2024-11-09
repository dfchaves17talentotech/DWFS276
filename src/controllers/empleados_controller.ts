import { QueryResult } from "pg";
import pool from "../database/db_connect_pg";
import { Request, Response } from "express";

export const getEmpleados = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM empleados;');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error, 
        });  
    }    
}

export const getEmpleadoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const empleadoId = parseInt(req.params.id);
        const response: QueryResult = await pool.query(`SELECT * FROM empleados WHERE id = ${empleadoId};`);
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error, 
        });  
    }
};

export const createEmpleado = async (req: Request, res: Response): Promise<Response> => {
    const {id, nombre, apellido, edad, departamento} = req.body;
    if (id !== null && nombre !== null && apellido !== null && edad !== undefined){
        try {
            await pool.query('INSERT INTO empleado (id, nombre, apellido, edad, departamento_id) values ($1, $2, $3, $4, $5)',
                [id, nombre, apellido, edad, departamento]
            );
            return res.status(201).json({
                message: 'Empleado created successfully',
                category: {
                    id,
                    nombre,
                    apellido,
                    edad,
                    departamento
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        return res.status(500).json('Internal Server Error');
    }
};