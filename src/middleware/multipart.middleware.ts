import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const upload = multer();

@Injectable()
export class MultipartMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.is('multipart/form-data')) {
      upload.single('data')(req, res, (err) => {
        if (err) {
          return res.status(400).send({ error: 'Invalid multipart request' });
        }

        // Check if the file exists
        const file = req.file;
        if (file) {
          try {
            // Parse file content if it exists
            const fileContent = file.buffer.toString('utf8');
            req.body = JSON.parse(fileContent); // Attach parsed data to req.body
          } catch (error) {
            return res.status(400).send({ error: `Error parsing file content: ${error.message}` });
          }
        }
        next(); // Proceed to the next middleware/controller
      });
    } else {
      next(); // Proceed if not multipart
    }
  }
}
