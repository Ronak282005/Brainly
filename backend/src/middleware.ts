import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export const userAuthMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token as string,JWT_SECRET);
    if(!token){
        res.status(403).json({
            msg : "Token required"
        })
    }
    if(decode){
        // @ts-ignore
        req.userId = decode.id;
        next();
    }else{
        res.status(403).json({
            msg : "Invalid token"
        })
    }
};