import { QueryResult } from "pg";
import pool from "../database/db_connect_pg";
//import { Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEmpleados = async (req: any, res:any): Promise<any>  => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM empleados ORDER BY id asc;');
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json(`Internal Server Error ${error}`);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEmpleadoById = async (req: any, res: any): Promise<any> => {
    try {
        const empleadoId = parseInt(req.params.id);
        const response: QueryResult = await pool.query(`SELECT * FROM empleados WHERE id = ${empleadoId};`);
        return res.json(response.rows);
    } catch (error) {
        return res.json({
            message: "Internal Server Error",
            error, 
        });  
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEmpleado = async (req: any, res: any): Promise<any> => {
    const {id, nombre, apellido, edad, departamento} = req.body;
    if (id !== null && nombre !== null && apellido !== null && edad !== undefined){
        try {
            await pool.query('INSERT INTO empleados (id, nombre, apellido, edad, departamento_id) values ($1, $2, $3, $4, $5)',
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
            return res.status(500).json(`Internal Server Error ${error}`);
        }
    } else {
        return res.status(500).json('Internal Server Error');
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteEmpleado = async (req: any, res: any): Promise<any> => {

    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM empleados WHERE id = $1', [id]);
        return res.status(200).json(`El empleado ${id} delete successfully.`);
    } catch (error) {
        return res.status(500).json(`Internal Server Error ${error}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEmpleado = async (req: any, res: any): Promise<any> => {

    const id = parseInt(req.params.id);
    const {edad, departamento} = req.body;
    try {
        await pool.query('UPDATE empleados SET edad = $1, departamento_id = $2 WHERE id = $3', [edad, departamento, id]);
        return res.status(200).json(`El empleado ${id} was updated successfully.`);
    } catch (error) {
        return res.status(500).json(`Internal Server Error ${error}`);
    }
};