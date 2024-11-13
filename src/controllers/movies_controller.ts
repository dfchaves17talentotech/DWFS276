import 'dotenv/config';
import { dbConnection } from "../database/db_connect_mongo";
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export const getMovies = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query = req.query;
        const collection = await dbConnection('movies');
        const filteredDocs = await collection.find(query).toArray();    
        return res.status(200).json(filteredDocs);
    } catch (error) {
        return res.status(500).json({messge: `Error al buscar los documentos ${error}`});
    }
};

export const getMoviesById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const movieId = req.params.id;
        const collection = await dbConnection('movies');
        const document = await collection.findOne({_id : new ObjectId(movieId)});    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al buscar el documento ${error}`});
    }
};

export const createMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
        const movieDocument = req.body;
        const collection = await dbConnection('movies');
        const document = await collection.insertOne(movieDocument);    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al insertar el documento ${error}`});
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query = req.query;
        const movieDocument = req.body;
        const collection = await dbConnection('movies');
        const document = await collection.updateOne(query, { $set: movieDocument});    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al actualizar el documento ${error}`});
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query = req.query;
        const collection = await dbConnection('movies');
        const document = await collection.deleteOne(query);    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al eliminar el documento ${error}`});
    }
};


