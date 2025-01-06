import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestMiddleware implements NestMiddleware {  
  use(req: Request, res: Response, next: NextFunction) {
    req.id = uuidv4(); 
    req.startTime = Date.now()
    next();
  }
}
