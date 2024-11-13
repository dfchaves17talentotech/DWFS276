import { Router } from "express";
import {
    createEmpleado,
    deleteEmpleado,
    getEmpleadoById,
    getEmpleados,
    updateEmpleado
} from "../controllers/empleados_controller";

const empleadosRutas = Router();

empleadosRutas.get('/empleados', getEmpleados);
empleadosRutas.get('/empleado/:id', getEmpleadoById);
empleadosRutas.post('/createEmpleado', createEmpleado);
empleadosRutas.put('/updateEmpleado/:id', updateEmpleado);
empleadosRutas.delete('/deleteEmpleado/:id', deleteEmpleado);

export {empleadosRutas};