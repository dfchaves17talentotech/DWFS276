import { Request, Response } from "express";
import { dbConnection } from "../database/db_connect_mongo";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { authenticateToken } from "../middlewares/users_middleware";

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

export const generateToken = async (req: Request, res:Response): Promise<Response> => {
    const {email, password} = req.body;
    const collection = await dbConnection('users');
    const filteredDocs = await collection.find({$and:[{ email: email}, {password: password }]}).toArray();
    if (filteredDocs.length>0) {
        const accessToken = jwt.sign({"email" : email}, `${process.env.CLAVE_JWT}`, {expiresIn: "1d"});
        await collection.updateOne({$and:[{ email: email}, {password: password }]}, { $set: {"token": accessToken}}); 
        return res.status(200).json({accessToken});
    }
    return res.status(500).json({message: "Error Login"});
};

export const getUserToken = async (email: String) => {
    const collection = await dbConnection('users');
    const filteredDocs = await collection.find({email: email}).toArray();
    if (filteredDocs.length>0) {
        return filteredDocs[0].token;
    } else return null;
};