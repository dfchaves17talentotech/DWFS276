import { Router } from "express";
import { createMovie, deleteMovie, getMovies, getMoviesById, updateMovie } from "../controllers/movies_controller";
import { authenticateToken } from "../middlewares/users_middleware";

const moviesRouter = Router();

moviesRouter.get('/getMovies', authenticateToken, getMovies);
moviesRouter.get('/getMoviesById/:id', authenticateToken, getMoviesById);
moviesRouter.post('/createMovie', authenticateToken, createMovie);
moviesRouter.put('/updateMovie', authenticateToken, updateMovie);
moviesRouter.delete('/deleteMovie', authenticateToken, deleteMovie);

export {moviesRouter};