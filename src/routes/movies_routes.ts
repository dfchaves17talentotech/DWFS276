import { Router } from "express";
import { createMovie, deleteMovie, getMovies, getMoviesById, updateMovie } from "../controllers/movies_controller";

const moviesRouter = Router();

moviesRouter.get('/getMovies', getMovies);
moviesRouter.get('/getMoviesById/:id', getMoviesById);
moviesRouter.post('/createMovie', createMovie);
moviesRouter.put('/updateMovie', updateMovie);
moviesRouter.delete('/deleteMovie', deleteMovie);

export {moviesRouter};