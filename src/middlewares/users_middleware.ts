import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserToken } from "../controllers/users_controller";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({error: 'Auth Token Not Found'});
    }
    jwt.verify(token, `${process.env.CLAVE_JWT}`, async (err, data) => {
        if (data!== undefined){
            const emailExtract = (data as { email: string }).email;
        const tokenDB = await getUserToken(emailExtract);
        if(tokenDB === token)
            {
                next();
            }
        }
        else {
            return res.status(403).json({error: 'Invalid Token'});
        }
    });
};