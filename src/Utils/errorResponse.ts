import { Response } from 'express';

interface ErrorResponse {
    status?: string;
    statusCode: number;
    message: string;
    details?: any; // Optional additional error details
  }

// Error Response Utility
export const sendErrorResponse = (
    res: Response,
    { statusCode, message, details }: ErrorResponse
  ): Response => {
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
      ...(details && { details }), // Include details if they exist
    });
  };
export default sendErrorResponse;