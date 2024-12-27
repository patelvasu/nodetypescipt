import { NextFunction, Request,Response } from 'express';
import * as ApiError from '../Utils/ApiError';
import {HttpStatus} from '../Constants/httpStatus';
import Messages from '../Constants/messages';
import sendSuccess from '../Utils/successResponse';
import employeeService from '../Services/employee.service';

class employeeController{
    public async getEmployee(req:Request,res:Response,next:NextFunction){            
        try {
            const getEmployee = await employeeService.getAllEmployees();
            sendSuccess(res,{getEmployee},Messages.Success.USER_GET_SUCCESSFUL,HttpStatus.OK);                    
        } catch (error:any) {                        
            return next(error)
        }                    
    }
    public async addEmployee(req:Request,res:Response, next:NextFunction){
        try {
            const existingEmployee = await employeeService.isExistingEmail(req.body.email);
            if (existingEmployee) {                
                return next(new ApiError.ConflictError(Messages.Errors.EMAIL_EXISTS(req.body.email)))
            }    
            const addEmployee = await employeeService.addEmployee(req.body);        
            sendSuccess(res,addEmployee,Messages.Success.USER_CREATED,HttpStatus.CREATED);            
        } catch (error:any) {            
            return next(error)
        }        
    }
    public async login(req:Request,res:Response,next:NextFunction){
        try {
            const {email,password}=req.body;
            const login = await employeeService.login(email,password);                       
            sendSuccess(res,login,Messages.Success.LOGIN_SUCCESSFUL,HttpStatus.OK);                        
        } catch (error) {
            return next(error)
        }        
    }
    public async home(req:Request,res:Response,next:NextFunction){
        try {
            // logging.info(req)
            sendSuccess(res, {...req.user}, Messages.Success.USER_GET_SUCCESSFUL, HttpStatus.OK);  
        } catch (error) {
            return next(error)   
        }
    }
}
export default new employeeController();