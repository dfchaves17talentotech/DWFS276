import { Request, Response } from "express";
import { dbConnection } from "../database/db_connect_mongo";

export const createUser = async (req:Request, res: Response): Promise<Response> => {
    try {
        const userDocument = req.body;
        const collection = await dbConnection('users');
        const document = await collection.insertOne(userDocument);    
        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({messge: `Error al insertar el documento ${error}`});
    }
};