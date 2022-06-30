import { NextFunction, Request, Response } from 'express';

// middleware para realizar os logs das requisições
export function logRequests(req: Request, res: Response, next: NextFunction) {
  console.log(
    '\x1b[35m%s\x1b[0m',
    `[${new Date().toUTCString()}] | [${req.method}] ${req.url}`
  );
  //setTimeout(() => next(), 5000);
  next();
}
