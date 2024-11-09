import express from "express";
import pool from "./database/db_connect_pg";
import { QueryResult } from "pg";
import { dbconnection } from "./database/db_connect_mongo";
import { createEmpleado, getEmpleadoById, getEmpleados } from "./controllers/empleados_controller";

const app = express();
const port = 3000;

app.get('/empleados', async(req, res) => {
    const empleados = await getEmpleados(req, res);
    res.send(empleados);
});

app.get('/empleados/:id', async(req, res) => {
    try {
        const empleados = await getEmpleadoById(req, res);
        res.send(empleados);
    } catch (error) {
        res.send(error);
    }
});

app.post('/createEmpleado', async(req, res) => {
    try {
        console.log(req.body);
        const empleados = await createEmpleado(req, res);
        res.send(empleados);
    } catch (error) {
        res.send(error);
    }
});



app.get('/', async (req, res) =>{
    try {
        const query: QueryResult = await pool.query("SELECT * FROM empleados;");
        res.status(200);
        res.send(query.rows);
    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

app.get('/mongo', async (req, res)=>{
    const response = await dbconnection('sample_mflix','movies');
    res.send(response);
});

app.listen(port, ()=>{
    return console.log(`Estoy corriendo en el puerto ${port}`);
});