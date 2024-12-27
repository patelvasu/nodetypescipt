import { Response } from 'express';
import { HttpStatus, ErrorType } from '../Constants/httpStatus';
import Messages from '../Constants/messages';
import sendErrorResponse from './errorResponse';

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {    
    switch (err.type) {
      case ErrorType.VALIDATION:        
        return sendErrorResponse(res,{
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
          details: err instanceof ValidationError ? err.details : undefined,
        });        
      case ErrorType.AUTH_FAILURE:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.UNAUTHORIZED,
          message: err.message
        })        
      case ErrorType.ACCESS_TOKEN:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.UNAUTHORIZED,
          message: err.message
        })        
      case ErrorType.INTERNAL:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message
        })                
      case ErrorType.NOT_FOUND:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.NOT_FOUND,
          message: err.message
        })                        
      case ErrorType.BAD_REQUEST:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message
        })                        
      case ErrorType.FORBIDDEN:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.FORBIDDEN,
          message: err.message
        })
        case ErrorType.CONFLICT:
          return sendErrorResponse(res,{
            statusCode: HttpStatus.CONFLICT,
            message: err.message
          })         
      default:
        return sendErrorResponse(res,{
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: Messages.Errors.SOMETHING_WENT_WRONG
        })         
    }
  }
}

export class ValidationError extends ApiError {  
  constructor(public details: { field: string; message: string }[], message = Messages.Errors.VALIDATION_FAILED) {
    super(ErrorType.VALIDATION, message);
  }
}

export class BadRequestError extends ApiError {
    constructor(message = Messages.Errors.BAD_REQUEST) {
      super(ErrorType.BAD_REQUEST, message);
    }
}

export class AuthFailureError extends ApiError {
  constructor(message = Messages.Errors.INVALID_CREDENTIALS) {
    super(ErrorType.AUTH_FAILURE, message);
  }
}

export class ForbiddenError extends ApiError {
    constructor(message = Messages.Errors.FORBIDDEN) {
      super(ErrorType.FORBIDDEN, message);
    }
}

export class AccessTokenError extends ApiError {
    constructor(message = Messages.Errors.INVALID_ACCESS_TOKEN) {
      super(ErrorType.ACCESS_TOKEN, message);
    }
}
export class InternalError extends ApiError {
    constructor(message = Messages.Errors.INTERNAL_SERVER_ERROR) {
      super(ErrorType.INTERNAL, message);
    }
}

export class NotFoundError extends ApiError {
  constructor(message = Messages.Errors.NOT_FOUND) {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message = Messages.Errors.ALREADY_EXITS) {
    super(ErrorType.CONFLICT, message);
  }
}
