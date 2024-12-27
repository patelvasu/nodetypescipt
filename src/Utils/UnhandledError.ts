import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../Constants/httpStatus';
import Messages from '../Constants/messages';
import sendErrorResponse from './errorResponse';

class UnhandledError {
  /**
   * Process unhandled errors and send appropriate responses.   
   */
  public static handle(err: any, req: Request, res: Response, next: NextFunction): Response {
    // Handle SyntaxError (e.g., malformed JSON)        
    if (err instanceof SyntaxError && 'body' in err) {      
      return sendErrorResponse(res,{
        statusCode: HttpStatus.BAD_REQUEST,
        message: Messages.Errors.INVALID_JSON        
      });      
    }    
    if (err.name === 'MongoServerError' && err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue).join(', ');
      const duplicateValue = Object.values(err.keyValue).join(', ');
      return sendErrorResponse(res, {
        statusCode: HttpStatus.CONFLICT,
        message: Messages.Errors.DUPLICATE_KEY(duplicateField,duplicateValue),
      });
    }

     // Handle JsonWebTokenError: Invalid Signature
     if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      return sendErrorResponse(res, {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: Messages.Errors.INVALID_ACCESS_TOKEN,
      });
    }
    if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
      return sendErrorResponse(res, {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: Messages.Errors.TOKEN_EXPIRED,
      });
    }

    // Handle unexpected errors  
    logging.error(err)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: Messages.Errors.SOMETHING_WENT_WRONG,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined, // Expose details in development
    });
  }
}

export default UnhandledError;
