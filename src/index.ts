import express from "express";
import { empleadosRutas } from "./routes/empleados_routes";

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Middleware para procesar datos `application/x-www-form-urlencoded`
app.use(express.urlencoded({ extended: true }));

app.use(empleadosRutas);

app.listen(port, ()=>{
    return console.log(`Estoy corriendo en el puerto ${port}`);
});