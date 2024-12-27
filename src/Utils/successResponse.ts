import { Response } from 'express';
import { HttpStatus } from '../Constants/httpStatus';
interface ApiResponse<T = any> {
    status: string;
    statusCode:string;    
    data?: T;
    message?: string;
}

// Success Response Utility
const sendSuccess = <T = any>(
    res: Response,
    data: T,
    message: string = 'Operation successful',
    status: number = HttpStatus.OK
): Response<ApiResponse<T>> => {
    return res.status(status).json({
        status: 'succes',        
        statusCode:status,
        message,
        ...(data && { data })
    });
};

export default sendSuccess;