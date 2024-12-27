import {Request,Response, NextFunction } from 'express';
import { AccessTokenError } from '../Utils/ApiError';
import Messages from '../Constants/messages';
import { Role } from '../Models/employee.model';


const authorization=(roles:Role[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const user= req.user;
            console.log("user",user);
            
            if(!user){
                throw new AccessTokenError(Messages.Errors.UNAUTHRIZED_ACCESS);
            }        
            if (!roles.includes(user.role)) {
                throw new AccessTokenError(Messages.Errors.FORBIDDEN_ACCESS_DENIED);
            }
            next();
        } catch (error) {        
            return next(error);
        }
    } 
}

export default authorization;