import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../Utils/ApiError';
import UnhandledError from '../Utils/UnhandledError';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the error is an instance of ApiError  
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  }  
  // Pass to UnhandledError handler for all other cases
  return UnhandledError.handle(err, req, res, next);
};
export default errorHandler;
