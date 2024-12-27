import { Router,Request,Response, NextFunction } from 'express';
import { NotFoundError } from '../Utils/ApiError';
import Messages from '../Constants/messages';
import employeeRoutes from './employeeRoutes';
import departmentRoutes from './departmentRoutes';

const router=Router();

/**
 * Default route for check server health
*/
router.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        message:Messages.Success.Done
    })
})

// User Router
router.use('/department',departmentRoutes);
router.use('/employee',employeeRoutes);

/**
 * Route not found
*/
router.use((req: Request, res: Response,next:NextFunction) => {    
    return next(new NotFoundError(Messages.Errors.ROUTE_NOT_FOUND(`${req.originalUrl}`)))    
});

export default router;