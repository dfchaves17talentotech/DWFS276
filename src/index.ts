import express from "express";
import { empleadosRutas } from "./routes/empleados_routes";
import { moviesRouter } from "./routes/movies_routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa el enrutador con un prefijo
app.use('/api', empleadosRutas);
app.use('/api', moviesRouter);

app.listen(port, () => {
    console.log(`Estoy corriendo en el puerto ${port}`);
});
