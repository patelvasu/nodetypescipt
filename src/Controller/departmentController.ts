import { NextFunction, Request,Response } from 'express';
import depoartmentService from '../Services/depoartment.service';
import {HttpStatus} from '../Constants/httpStatus';
import Messages from '../Constants/messages';
import sendSuccess from '../Utils/successResponse';

class departmentController{
    public async getDeartment(req:Request,res:Response,next:NextFunction){                
        try {
            const departments = await depoartmentService.getAllDepartments();
            sendSuccess(res,{departments},Messages.Success.DEPARTMENT_GET_SUCCESSFUL,HttpStatus.OK);           
        }catch (error:any) {
            return next(error)
        }        
    }
    public async addDepartment(req:Request,res:Response, next:NextFunction){
        try {    
            const departmentsCreate = await depoartmentService.addDepartment(req.body);            
            sendSuccess(res,departmentsCreate,Messages.Success.DEPARTMENT_CREATED,HttpStatus.CREATED);            
        } catch (error:any) {
            return next(error)
        }        
    }
}
export default new departmentController();