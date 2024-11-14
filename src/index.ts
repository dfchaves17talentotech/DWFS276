import express from "express";
import { empleadosRutas } from "./routes/empleados_routes";
import { moviesRouter } from "./routes/movies_routes";
import { userRouter } from "./routes/user_router";
import { errorHandler } from "./middlewares/error_middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/api', empleadosRutas);
app.use('/api', moviesRouter);
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`Estoy corriendo en el puerto ${port}`);
});
