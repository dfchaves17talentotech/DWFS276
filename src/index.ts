import express from "express";
import pool from "./database/db_connect_pg";
import { QueryResult } from "pg";
import { dbconnection } from "./database/db_connect_mongo";

const app = express();
const port = 3000;

app.get('/', async (req, res) =>{
    try {
        const query: QueryResult = await pool.query("SELECT * FROM empleados;");
        res.status(200);
        res.send(query.rows);
    } catch (error) {
        res.status(500);
        console.error(error);
    }
    res.send('Hola soy mi primera ruta de express');
});

app.get('/mongo', (req, res)=>{
    const response = dbconnection('sample_mflix','movies');
    res.send(response);
});

app.listen(port, ()=>{
    return console.log(`Estoy corriendo en el puerto ${port}`);
});