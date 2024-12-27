import { Request, Response, NextFunction } from 'express';

function sanitizeData(data: any): any {
  if (!data) return data;
  
  const sanitized = { ...data };
  const sensitiveFields = ['password', 'creditCard', 'token'];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) sanitized[field] = '[REDACTED]';
  });

  return sanitized;
}

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString(); // ISO format for timestamp
  const requestData =
    req.method === 'POST' ? req.body || req.params || req.query : { ...req.params, ...req.query };

  const sanitizedData = sanitizeData(requestData);

  console.log(
    `[${timestamp}] Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - DATA: ${JSON.stringify(sanitizedData)}`
  );

  res.on('finish', () => {
    console.log(
      `[${new Date().toISOString()}] Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
}
