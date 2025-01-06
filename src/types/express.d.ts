import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      startTime?: time
      parsedData?:any
    }
  }
}  