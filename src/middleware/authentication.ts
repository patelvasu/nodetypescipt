import {Request,Response, NextFunction } from 'express';
import { AccessTokenError } from '../Utils/ApiError';
import Messages from '../Constants/messages';
import TokenUtil from '../Utils/tokenUtil';



const authentication=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token:string|undefined = req.headers.authorization?.split(' ')[1] || req.headers.authorization; 
        if(!token){
            throw new AccessTokenError(Messages.Errors.AUTH_TOKEN_NOT_FOUND);
        }
        const decodedToken = TokenUtil.verifyToken(token);        
        //req.user={id:decodedToken.id,name:decodedToken.name,email:decodedToken.email,role:decodedToken.role};
        next();
    } catch (error) {        
        return next(error);
    }
} 

export default authentication