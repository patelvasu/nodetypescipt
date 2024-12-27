import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';
import { ValidationError,InternalError } from '../Utils/ApiError';

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}
  
// Validation middleware
export default (schema: AnySchema, source: ValidationSource = ValidationSource.BODY) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {        
      const { error } = schema.validate(req[source], { abortEarly: false });

      if (!error) return next();

      // Extract and format validation error messages
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'), // Converts nested paths into a string
        message: detail.message.replace(/['"]+/g, ''), // Clean up message format
      }));
      return next(new ValidationError(errors))
    } catch (error:any) {                
        return next(new InternalError());
    }
  };

